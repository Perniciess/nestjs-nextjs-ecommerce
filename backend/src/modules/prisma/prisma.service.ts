import { Injectable, OnModuleDestroy, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    await this.connectWithRetry();
  }

  private async connectWithRetry(retries = 10, delayMs = 5000) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        await this.$connect();
        this.logger.log('✅ Connected to database');
        return;
      } catch (error) {
        this.logger.error(
          `⚠️ Failed to connect to database (attempt ${attempt}/${retries}): ${error.message}`,
        );
        if (attempt < retries) {
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        } else {
          this.logger.error('❌ Could not connect to database after all retries.');
          throw error;
        }
      }
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
