### Todo list
- [x] Fix "ENOENT" 
- [x] Started working on redesigning the frontend part:
	- [x] Return widgets/description and catalog
	- [x] Fix FSD design features/auth
	- [x] Fix FSD design in entities
	- [x] Check FSD errors in widgets
	- [ ] Add Zustand

### Notes for dev
NEST_WEB_URL="http://localhost:3000/"
"ENOENT" if request on wrong URL


shadcnui


sudo docker run -d \
  --name postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=1 \
  -e POSTGRES_DB=postgres \
  -p 5432:5432 \
  -v $(pwd)/database/postgresql-data:/var/lib/postgresql/data \
  postgres:16
