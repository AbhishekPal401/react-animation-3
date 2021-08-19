import React ,{useState}from 'react';
import { StyleSheet ,Switch ,Dimensions,Text } from 'react-native';
import Animated, {useSharedValue,useAnimatedStyle,interpolateColor,useDerivedValue,withTiming} from 'react-native-reanimated';




const Colors={
Dark:{
  background:'#1E1E1E',
  circle:'#252525',
  text:'#F8F8F8',
},
light:{
  background:'#F8F8F8',
  circle:'#FFF',
  text:'#1E1E1E',
}
}

const SWITCH_TRACK_COLOR={
  true:'rgba(256,0,256,0.2)',
  false:'rgba(0,0,0,0.1)'
}


export default function App() {

  const [theme,setTheme] =useState(false);

  const  progress=useDerivedValue(()=>{
    return theme?withTiming(1):withTiming(0)
  })

  const animatedStyles=useAnimatedStyle(()=>{

    const backgroundColors=interpolateColor(progress.value,[0,1],[Colors.light.background,Colors.Dark.background]);

    return {
      backgroundColor:backgroundColors
    }
  })
  const circleStyles=useAnimatedStyle(()=>{

    const backgroundColors=interpolateColor(progress.value,[0,1],[Colors.light.circle,Colors.Dark.circle]);

    return {
      borderColor:backgroundColors,
      backgroundColor:backgroundColors
    }
  })
  const textStyles=useAnimatedStyle(()=>{

    const colors=interpolateColor(progress.value,[0,1],[Colors.light.text,Colors.Dark.text]);

    return {
     color:colors
    }
  })

  return (
    <Animated.View style={[styles.container,animatedStyles]}>

      <Animated.Text style={[styles.theme,textStyles]}>THEME</Animated.Text>
     
      <Animated.View style={[styles.circle,circleStyles]}>

      <Switch  value={theme} onValueChange={(toggled)=>{
       setTheme(toggled)} } trackColor={SWITCH_TRACK_COLOR}  thumbColor='violet' />

      </Animated.View>
     
      
    </Animated.View>
  )
}

const {width,height}=Dimensions.get('window')
const SIZE=width*0.75;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle:{
    width:SIZE,
    height:SIZE,
    borderRadius:SIZE/2,
    borderWidth:1,
    justifyContent: 'center',
    alignItems:'center',
    elevation:15,
    backgroundColor:'#FFF'
  },
  theme:{
    fontSize:50,
    marginBottom:20,
    textTransform:'uppercase',
    fontWeight:'700',
  }
});
