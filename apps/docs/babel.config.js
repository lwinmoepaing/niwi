module.exports = {
  presets: [require.resolve('@docusaurus/core/lib/babel/preset')],
  plugins: [
    [
      'module-resolver',
      {
        root: ["./src"],
        alias: {
          '@': './src', // Adjust the path to match your project structure
        },
      },
    ],
  ],
};
