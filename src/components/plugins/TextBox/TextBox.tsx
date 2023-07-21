'use client'

import React from 'react'
import { MuiColorInput } from 'mui-color-input'
import AccordionItem from '@components/AccordionItem'
import { WebSafeFont, webSafeFonts } from '@constants/web-safe-fonts'
import { Text } from '@schemas/text'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField'
import ToggleButton from '@mui/material/ToggleButton'
import Typography from '@mui/material/Typography'
import * as Styled from './TextBox.styled'

export type TextBoxProps = {
  index: number
  text: Text
  onChange: (text: Text, index: number) => void
  onDelete: (text: Text, index: number) => void
  onDuplicate: (text: Text, index: number) => void
}

const formats = ['bold', 'italic', 'underlined'] as const
type Format = (typeof formats)[number]

export const TextBox = ({
  index,
  text,
  onChange,
  onDelete,
  onDuplicate
}: TextBoxProps) => {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const textFormats = React.useMemo(() => {
    return formats.filter((format) => {
      if (format === 'bold') {
        return text.bold
      }

      if (format === 'italic') {
        return text.italic
      }

      if (format === 'underlined') {
        return text.underlined
      }

      return false
    })
  }, [text.bold, text.italic, text.underlined])

  React.useLayoutEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus()
    }
  }, [isExpanded])

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(
      {
        ...text,
        value: event.target.value
      },
      index
    )
  }

  const handleChangeColor = (newColor: string) => {
    onChange(
      {
        ...text,
        color: newColor
      },
      index
    )
  }

  const handleChangeBackgroundColor = (newBackgroundColor: string) => {
    onChange(
      {
        ...text,
        backgroundColor: newBackgroundColor
      },
      index
    )
  }

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: Text['textAlign']
  ) => {
    onChange(
      {
        ...text,
        textAlign: newAlignment
      },
      index
    )
  }

  const handleChangeSize = (event: Event, newValue: number | number[]) => {
    onChange(
      {
        ...text,
        fontSize: newValue as number
      },
      index
    )
  }

  const handleChangeFontFamily = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange(
      {
        ...text,
        fontFamily: event.target.value as WebSafeFont
      },
      index
    )
  }

  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: Format[]
  ) => {
    onChange(
      {
        ...text,
        bold: newFormats.includes('bold'),
        italic: newFormats.includes('italic'),
        underlined: newFormats.includes('underlined')
      },
      index
    )
  }

  const handleDelete = () => {
    onDelete(text, index)
  }

  const handleDuplicate = () => {
    onDuplicate(text, index)
  }

  return (
    <AccordionItem
      index={index}
      onDelete={handleDelete}
      onDuplicate={handleDuplicate}
      isExpanded={isExpanded}
      onChange={setIsExpanded}
      title={text.value}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          id="outlined-multiline-flexible"
          label="Multiline"
          onChange={handleChangeValue}
          multiline
          inputRef={inputRef}
          value={text.value}
          fullWidth
          maxRows={4}
        />
        <MuiColorInput
          label="Couleur de texte"
          value={text.color}
          format="hex"
          onChange={handleChangeColor}
        />
        <MuiColorInput
          label="Couleur de fond"
          value={text.backgroundColor}
          format="hex"
          onChange={handleChangeBackgroundColor}
        />
        <TextField
          onChange={handleChangeFontFamily}
          select
          label="Police d'écriture"
          value={text.fontFamily}
        >
          {webSafeFonts.map((fontFamily) => {
            return (
              <MenuItem key={fontFamily} value={fontFamily}>
                {fontFamily}
              </MenuItem>
            )
          })}
        </TextField>
        <Box>
          <Typography gutterBottom>Taille du texte</Typography>
          <Slider
            onChange={handleChangeSize}
            size="small"
            value={text.fontSize}
            max={200}
            aria-label="Taille du texte"
            valueLabelDisplay="off"
          />
        </Box>
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            alignSelf: 'center',
            justifyContent: 'center',
            border: (theme) => {
              return `1px solid ${theme.palette.divider}`
            },
            flexWrap: 'wrap'
          }}
        >
          <Styled.ToggleButtonGroup
            size="small"
            value={text.textAlign}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton
              value={'left' as Text['textAlign']}
              aria-label="left aligned"
            >
              <FormatAlignLeftIcon />
            </ToggleButton>
            <ToggleButton
              value={'center' as Text['textAlign']}
              aria-label="centered"
            >
              <FormatAlignCenterIcon />
            </ToggleButton>
            <ToggleButton
              value={'right' as Text['textAlign']}
              aria-label="right aligned"
            >
              <FormatAlignRightIcon />
            </ToggleButton>
            <ToggleButton
              value={'justify' as Text['textAlign']}
              aria-label="justify aligned"
            >
              <FormatAlignJustifyIcon />
            </ToggleButton>
          </Styled.ToggleButtonGroup>
          <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
          <Styled.ToggleButtonGroup
            size="small"
            value={textFormats}
            onChange={handleFormat}
            aria-label="text formatting"
          >
            <ToggleButton value={'bold' as Format} aria-label="bold">
              <FormatBoldIcon />
            </ToggleButton>
            <ToggleButton value={'italic' as Format} aria-label="italic">
              <FormatItalicIcon />
            </ToggleButton>
            <ToggleButton
              value={'underlined' as Format}
              aria-label="underlined"
            >
              <FormatUnderlinedIcon />
            </ToggleButton>
          </Styled.ToggleButtonGroup>
        </Paper>
      </Box>
    </AccordionItem>
  )
}

export default React.memo(TextBox)
