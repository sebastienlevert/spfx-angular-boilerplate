'use strict';

const gulp = require('gulp');
const path = require('path');
const build = require('@microsoft/sp-build-web');
const webpack = require('webpack');
const merge = require('webpack-merge');

/**
 * Fixing the "5644:15-36 Critical dependency: the request of a dependency is an expression" warning
 * Linked to an existing bug/problem in Angular https://github.com/angular/angular/issues/11580
 */
build.configureWebpack.mergeConfig({ 
  additionalConfiguration: (generatedConfiguration) => {
    generatedConfiguration.plugins.push(
      new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core/,
        path.resolve(__dirname, './src')
      )
    ); 

    const angularConfig = {
      module: {
        loaders: [
          {
            test: /\.html$/,
            loader: 'html-loader?minimize=true&removeComments=true&collapseWhitespace=true&removeAttributeQuotes=false&keepClosingSlash=true&caseSensitive=true&conservativeCollapse=true',
          }
        ]
      }
    };
    
    return merge.smart(generatedConfiguration, angularConfig);
  } 
});

build.initialize(gulp);
