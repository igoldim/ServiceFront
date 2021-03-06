import React from 'react';
import styled from 'styled-components/native';

const StarArea = styled.View`
  flex-direction: row;
`;
const StarView = styled.TouchableOpacity``;
const StarViewS = styled.View``;

const StartText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  margin-left: 5px;
  color: #737373;
`;

import StarFull from "../assets/avgs/star.svg";
import StarHalf from "../assets/avgs/star_half.svg";
import StarEmpty from "../assets/avgs/star_empty.svg";
import { StyleProp, ViewStyle } from 'react-native';


export interface StarsProps {
  value: number;
  showNumber: boolean;
  color?: string | undefined;
  width?:string;     
  height?:string; 
  startStyle?: StyleProp<ViewStyle>;
  onPress: (e: number) => void;
  isSave: boolean;
}


const Stars: React.FC<StarsProps> = (props) => {
  const [stars, setStars] = React.useState<number[]>([]);
  React.useEffect(() =>{
    const loadData = () => {
      let s = [0, 0, 0, 0, 0];
      let floor = Math.floor(props.value);
      let left = props.value - floor;
      
      for (var i = 0; i < floor; i++) {
        s[i] = 2;
      }
      if (left > 0){
        s[i] = 1;
      }
      setStars(s);
    };
    loadData();
  }, [props.value]);

return(
  <StarArea style={props.startStyle}>
    {!props.isSave && stars.map((i, k) => (
        <StarViewS key={k}>
          {i === 0 && <StarEmpty width={props.width ? props.width : "18"} height={props.height ? props.height : "18"} fill={props.color ? props.color : "#FF9200"} />}
          {i === 1 && <StarHalf width={props.width ? props.width : "18"} height={props.height ? props.height : "18"} fill={props.color ? props.color : "#FF9200"}/>}
          {i === 2 && <StarFull width={props.width ? props.width : "18"} height={props.height ? props.height : "18"} fill={props.color ? props.color : "#FF9200"} />}
        </StarViewS>
    ))}

    {props.isSave && stars.map((i, k) => (
        <StarView key={k}  onPress={() => props.onPress(k+1)}>
          {i === 0 && <StarEmpty width={props.width ? props.width : "18"} height={props.height ? props.height : "18"} fill={props.color ? props.color : "#FF9200"} />}
          {i === 1 && <StarHalf width={props.width ? props.width : "18"} height={props.height ? props.height : "18"} fill={props.color ? props.color : "#FF9200"}/>}
          {i === 2 && <StarFull width={props.width ? props.width : "18"} height={props.height ? props.height : "18"} fill={props.color ? props.color : "#FF9200"} />}
        </StarView>
    ))}


    {props.showNumber && <StartText style={{color: props.color ? props.color : "#000"}} >{props.value.toString()}</StartText>}
  </StarArea>
  );
};  

export default Stars;