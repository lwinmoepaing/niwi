module.exports = {
  presets: [require.resolve('@docusaurus/core/lib/babel/preset')],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': './src', // Adjust the path to match your project structure
        },
      },
    ],
  ],
};
