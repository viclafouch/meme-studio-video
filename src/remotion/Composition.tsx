import { AbsoluteFill, Video as RemotionVideo } from 'remotion'
import { Text } from '@schemas/text'
import { Video } from '@schemas/video'

const defaultTexts: Text[] = []

export const Composition: React.FC<{
  videoURL: Video['url']
  texts: readonly Text[]
}> = ({ videoURL, texts = defaultTexts }) => {
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: '#000000', color: '#fff' }}>
        <RemotionVideo src={videoURL} />
      </AbsoluteFill>
      <AbsoluteFill>
        {texts.map((text) => {
          return (
            <div
              key={text.id}
              style={{
                position: 'absolute',
                top: text.y,
                left: text.x,
                fontFamily: 'Arial',
                fontSize: 16,
                color: text.color,
                background: 'red',
                textAlign: text.textAlign,
                fontStyle: text.italic ? 'italic' : 'initial',
                fontWeight: text.bold ? 'bold' : 'initial',
                textDecoration: text.underlined ? 'underline' : 'initial'
              }}
            >
              {text.value}
            </div>
          )
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
