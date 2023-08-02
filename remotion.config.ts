import path from 'path'
import { Config } from '@remotion/cli/config'

Config.overrideWebpackConfig((config) => {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias ?? {}),
        '@components': path.join(process.cwd(), 'src', 'components'),
        '@schemas': path.join(process.cwd(), 'src', 'schemas'),
        '@helpers': path.join(process.cwd(), 'src', 'helpers'),
        '@constants': path.join(process.cwd(), 'src', 'constants')
      }
    }
  }
})
