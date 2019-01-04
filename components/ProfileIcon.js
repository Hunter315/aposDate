import Ionicons from "@expo/vector-icons/Ionicons";

const profileIcon = ({focused}) => (
    <Ionicons style={ styles.nav } color={'#df4723'} name={focused ? 'ios-person' : 'ios-person-outline'} size={40}/>
)

export default profileIcon;