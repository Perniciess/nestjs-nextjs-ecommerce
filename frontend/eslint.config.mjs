import antfu from '@antfu/eslint-config'

export default antfu({
    stylistic: {
        indent: 4,
        quotes: 'single',
    },

    typescript: {
        tsconfigPath: 'tsconfig.json',
    },
    react: true,
    lessOpinionated: true,
    rules: { 'n/prefer-global/process': 0 },
})
