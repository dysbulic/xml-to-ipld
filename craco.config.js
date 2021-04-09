module.exports = {
  webpack: {
    configure: {
      entry: {
        main: './src/index.jsx',
        ForcedGraph: './src/ForcedGraph.jsx',
      },
      output: {
        filename: '[name].bundle.js',
      },
    },
  },
}