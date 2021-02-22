import React, {useState, useContext} from 'react'
import {StyleSheet,View,Dimensions} from 'react-native'
import {FontAwesome, AntDesign} from '@expo/vector-icons'
import { THEME } from '../theme'
import { AppCard } from '../components/ui/AppCard'
import { EditModal } from '../components/EditModal'
import {AppTextBold} from '../components/ui/AppTextBold'
import {AppButton} from '../components/ui/AppButton'
import { TodoContext } from '../context/todo/todoContext'
import { ScreenContext } from '../context/screen/screenContext'


export const TodoScreen = () =>{
    const {todos, updateTodo, removeTodo} = useContext(TodoContext)
    const {todoId, changeScreen} = useContext(ScreenContext)

    const todo = todos.find(t => t.id === todoId)

    const [modal, setModal] = useState(false)

    const saveHandler = title => {
        updateTodo(todo.id, title)
         setModal(false)
    }

return(
    <View>
        <EditModal 
        value={todo.title}
        visible={modal}  
        onCancel={() => setModal(false)}
        onSave={saveHandler}
        />

        <AppCard style={styles.card}>
             <AppTextBold style={styles.title}> {todo.title}</AppTextBold>
             <AppButton color={THEME.GREEN_COLOR} onPress={() => setModal(true)}>
               <FontAwesome name='edit' size={15} />
             </AppButton>
        </AppCard>

        <View style={styles.butttons}>
        <View style={styles.button}>

        <AppButton  onPress={() => changeScreen(null)} 
        color={THEME.GREY_COLOR}>
            <AntDesign name='back' size={18}/>
        </AppButton>

        </View>

        <View style={styles.button}>
        <AppButton 
        color={THEME.DANGER_COLOR} 
        onPress={()=> removeTodo(todo.id)}
        >
            <FontAwesome name='remove' size={18}/>
        </AppButton>


        </View>

        </View>
    </View>
)
}


const styles = StyleSheet.create({
    butttons:{
        flexDirection:'row',
        justifyContent:'space-between',

    },
    card:{
        marginBottom: 20,
        padding:25
    },
    button:{
        // width: Dimensions.get('window').width/3,
        width: Dimensions.get('window').width > 400 ? 150 : 100
    },
    title:{
        fontSize: 18
    },
   
   
})