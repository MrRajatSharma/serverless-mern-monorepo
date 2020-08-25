import webpack from 'webpack';
import config from '../webpack.config.prod';

process.env.NODE_ENV = 'production';

webpack(config).run((error, stats) => {
  if (error) {
    console.log(error);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (stats.hasErrors && jsonStats.errors.length > 0) {
    return jsonStats.errors.map(err => console.log(err));
  }

  if (stats.hasWarnings && jsonStats.warnings.length > 0) {
    console.log('Warnings: ');
    jsonStats.warnings.map(warning => console.log(warning));
  }

  console.log(`Webpack stats: ${stats}`);

  console.log('Compiled in production mode in /dist.');

  return 0;
});