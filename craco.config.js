module.exports = {
  webpack: {
    configure: {
      entry: {
        main: './src/index.jsx',
        // makes the hamburger menu disappear
        // ForcedGraph: './src/ForcedGraph.jsx',
      },
      output: {
        filename: '[name].bundle.js',
      },
    },
  },
}