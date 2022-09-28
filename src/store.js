import { configureStore, createSlice } from "@reduxjs/toolkit";


let user = createSlice({
    name: 'user',
    initialState :{name:'kim',age:20 },
    reducers:{
        changeName(state){
            state.name = 'park'
        },
        changeAge(state, action){
            state.age += action.payload;
        }
    }
});

export let {changeName, changeAge} = user.actions;

let stock = createSlice({
    name: 'stock',
    initialState :[
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
      ] ,
      reducers:{
        plusStock(state, action){
            //state[action.payload].count +=1;
            for(var i=0;i<state.length;i++){
                if(action.payload == state[i].id){
                    state[i].count +=1;
                }
            }
        },
        addCart(state, action){
            var inCart = false;
            for(var i=0;i<state.length;i++){
                if(state[i].id == action.payload.id){
                    inCart = true;
                    state[i].count +=action.payload.count;
                    break;
                }
            }
            if(!inCart){
                state.push(action.payload);
            }  
        },
        deleteCart(state, action){
            
            // for(var i=0;i<state.length;i++){
            //     if(action.payload !== state[i].id){
            //         state.splice(state.findIndex((arrow) => arrow.id === action.payload), 1);
            //     }
            // }
            state.splice(state.findIndex((arrow) => arrow.id === action.payload), 1);
            
        }

      }
});

export let {plusStock, addCart, deleteCart} = stock.actions;

export default configureStore({
    reducer:{
        user: user.reducer,
        stock: stock.reducer
    }
})