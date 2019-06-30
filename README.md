# riot-tag-new-loader (Riot.js version 3 only)

**Riot** new **Webpack** loader

- **Example Riot-App [Online](http://353492.playcode.io/#!/list)**
- **Example Riot-App [Git](https://github.com/legostaev-vadim/riot-app)**
- **[Gulp](https://www.npmjs.com/package/gulp-riot-tag)**


***
**Example Autoprefixer and Babel for Riot.js version 4**

1. [Install official loader](https://www.npmjs.com/package/@riotjs/webpack-loader)
2. [webpack.config.js](https://github.com/legostaev-vadim/riot-app/blob/master/v4/webpack.config.js)
3. [example](https://github.com/legostaev-vadim/riot-app/tree/master/v4)
***


# Install

```
npm i -D riot-tag-new-loader
```

## Usage

### webpack.config.js

```js
module.exports = {
  module: {
    rules: [
      ... // other rules
      {
        test: /\.tag$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'riot-tag-new-loader',
          options: {
            parsers: {
              css: {
                myparser: function(tag, css) {
                  return css.replace(/@tag/, tag)
                }
              }
            }
          }
        }
      }
      ... // other rules
    ]
  }
}
```

### Todo.tag

```tag
<todo>
  <p>hi</p>
  <style type="text/myparser">
    @tag {color: red;}
  </style>
</todo>
```

will be compiled to:

```tag
<todo>
  <p>hi</p>
  <style type="text/myparser">
    todo {color: red;}
  </style>
</todo>
```

## Example for Autoprefixer and Babel

```
npm i -D babel-loader @babel/core @babel/preset-env riot-tag-new-loader postcss autoprefixer
```

### webpack.config.js

```js
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const path = require('path')

module.exports = {
  entry: './src/App.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js',
    publicPath: 'dist/'
  },
  module: {
    rules: [
      {
        test: /\.tag$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          {
            loader: 'riot-tag-new-loader',
            options: {
              parsers: {
                css: {
                  myparser: function(tag, css) {
                    return postcss([ autoprefixer({ browsers: ['last 15 versions'] }) ]).process(css).css
                  }
                }
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
```

- **[Compiler](https://riot.js.org/guide/compiler/)**
- **[API](https://riot.js.org/api/compiler/)**

## License

ISC License

## Author

Legostaev Vadim (*legostaev.vadim@mail.ru*)
