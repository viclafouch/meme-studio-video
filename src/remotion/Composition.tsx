import { AbsoluteFill } from 'remotion'

export const MyComp: React.FC<{ text: string }> = ({ text }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', color: '#fff' }}>
      Hello {text}!
    </AbsoluteFill>
  )
}
