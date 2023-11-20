import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import { useContext } from 'react'
import { AppContext, ThemeContext } from '../context'
import {
  AnthropicIcon,
  OpenAIIcon,
  CohereIcon,
 } from '../components/index'
 import FontAwesome from '@expo/vector-icons/FontAwesome5'
 import { IIconProps } from '../../types'
 import { MODELS } from '../../constants'

const imageModels = [
  { name: 'Fast Image', label: 'fastImage' },
  { name: 'Remove BG', label: 'removeBg' }
]
const models = Object.values(MODELS)

export function Settings() {
  const { theme, setTheme, themeName } = useContext(ThemeContext)
  const {
    chatType,
    setChatType,
    setImageModel,
    imageModel
  } = useContext(AppContext)

  const styles = getStyles(theme)

  function renderIcon({
    type, props
  }: IIconProps) {
    if (type.includes('gpt')) {
      return <OpenAIIcon {...props} />
    }
    if (type.includes('claude')) {
      return <AnthropicIcon {...props} />
    }
    if (type.includes('cohere')) {
      return <CohereIcon {...props} />
    }
    if (type.includes('fastImage')) {
      return <FontAwesome name="images" {...props} />
    }
    if (type.includes('removeBg')) {
      return <FontAwesome name="x-ray" {...props} />
    }
  }

  return (
    <View style={styles.container}>
      <View
        style={styles.titleContainer}
      >
        <Text
            style={styles.mainText}
        >Theme</Text>
      </View>
      <TouchableHighlight
          underlayColor='transparent'
          onPress={() => {
            setTheme('light')
          }}
        >
          <View
            style={{...styles.chatChoiceButton, ...getDynamicViewStyle(themeName,'light', theme)}}
          >
          <Text
            style={{...styles.chatTypeText, ...getDynamicTextStyle(themeName, 'light', theme)}}
          >
            Light
          </Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
          underlayColor='transparent'
          onPress={() => {
            setTheme('dark')
          }}
        >
          <View
            style={{...styles.chatChoiceButton, ...getDynamicViewStyle(themeName,'dark', theme)}}
          >
          <Text
            style={{...styles.chatTypeText, ...getDynamicTextStyle(themeName, 'dark', theme)}}
          >
            Dark
          </Text>
        </View>
      </TouchableHighlight>
      <View
        style={styles.titleContainer}
      >
      <Text
          style={styles.mainText}
        >Chat Model</Text>
      </View>
      <View style={styles.buttonContainer}>
        {
          models.map((model, index) => {
            return (
              <TouchableHighlight
                key={index}
                underlayColor='transparent'
                onPress={() => {
                  setChatType(model)
                }}
              >
                <View
                  style={{...styles.chatChoiceButton, ...getDynamicViewStyle(chatType.label, model.label, theme)}}
                >
                {
                  renderIcon({
                    type: model.label,
                    props: {
                      theme,
                      size: 18,
                      style: {marginRight: 8},
                      selected: chatType.label === model.label
                    }
                  })
                }
                <Text
                  style={{...styles.chatTypeText, ...getDynamicTextStyle(chatType.label, model.label, theme)}}
                >
                  { model.name }
                </Text>
              </View>
            </TouchableHighlight>
            )
          })
        }
      </View>
      <View
        style={styles.titleContainer}
      >
      <Text
          style={styles.mainText}
        >Chat Model</Text>
      </View>
      <View style={styles.buttonContainer}>
        {
          imageModels.map((model, index) => {
            return (
              <TouchableHighlight
                key={index}
                underlayColor='transparent'
                onPress={() => {
                  setImageModel(model.label)
                }}
              >
                <View
                  style={{...styles.chatChoiceButton, ...getDynamicViewStyle(imageModel, model.label, theme)}}
                >
                {
                  renderIcon({
                    type: model.label,
                    props: {
                      theme,
                      size: 18,
                      style: {marginRight: 8},
                      color: imageModel === model.label ? theme.secondaryTextColor : theme.textColor
                    }
                  })
                }
                <Text
                  style={{...styles.chatTypeText, ...getDynamicTextStyle(imageModel, model.label, theme)}}
                >
                  { model.name }
                </Text>
              </View>
            </TouchableHighlight>
            )
          })
        }
      </View>
    </View>
  )
}

function getDynamicTextStyle(baseType:string, type:string, theme:any) {
  if (type === baseType) {
    return {
      color: theme.highlightedTextColor,
    }
  } else return {}
}


function getDynamicViewStyle(baseType:string, type:string, theme:any) {
  if (type === baseType) {
    return {
      backgroundColor: theme.tintColor
    }
  } else return {}
}

const getStyles = (theme:any) => StyleSheet.create({
  buttonContainer: {
    marginBottom: 20
  },
  container: {
    padding: 14,
    flex: 1,
    backgroundColor: theme.backgroundColor,
    paddingTop: 20,
  },
  titleContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  chatChoiceButton: {
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row'
  },
  chatTypeText: {
    fontFamily: 'Geist-SemiBold',
    color: theme.textColor
  },
  mainText: {
    fontFamily: 'Geist-Bold',
    fontSize: 18,
    color: theme.textColor
  },
})