import React, { Component } from 'react'
import './index.css'

function Round(n, ops, num, arr, index) {
    for(let i= -1; i <= n; i++){
        console.log(n)
        console.log(i)
        console.log(arr[index])
        if (ops === "x") num *= arr[index+(2*i)]
        else if (ops === "/") num /= arr[index+(2*i)]
        
    }
    return num
}

export default class Calculator extends Component {
    state = {
        data: [""],
        result: 0
    }
    addNumber = (num)=>{
        let data = [...this.state.data];
        let lastData = data[data.length-1];
        if(!isNaN(Number(lastData))  ){
          [data[data.length-1]]= [data[data.length-1]+num]
        this.setState(prevState => { return prevState = {data}})  
        } else {
            this.setState(prevState => {return prevState = {data: [...this.state.data, num]}})
        }
        this.setState((prevState)=> {
            let input =  ""; 
           prevState.data.forEach( str => input += str)
            return prevState = {result: input}} )
    }
    addOps = (ops) => {
        this.setState(prevState => prevState = {data: [...this.state.data, ops] }) 
        
         
         this.setState((prevState)=> {
            let input =  ""; 
           prevState.data.forEach( str => input += str)
            return prevState = {result: input}} )
    }
    handleResult= ()=>{
        const arr = this.state.data;
        let result = this.state.result
        for (let i = 0; i < arr.length - 2; i += 2) {
            if (i === 0) {
                result = +arr[i];
            }
            if (arr[i + 1] === "+" ) {
                result += +arr[i + 2]
            }
            else if (arr[i + 1] === "-") {
                result -= +arr[i + 2]
            }
            else if (arr[i + 1] === "x") {
                if (arr[i - 1] === "+" || arr[i-1] === undefined) result += +arr[i] * (+arr[i + 2]) - arr[i]
                else if (arr[i - 1] === "-") result -= +arr[i] * (+arr[i + 2]) - arr[i]
                let m = i
            
                let num = 1, round = 0, value = 0
                while (arr[m - 1] === "x" || arr[m - 1] === "/") {
                    round++
                    if(arr[m-1] === "x"){
                    value = Round(round-1, "x", num, arr, m)
                    num = Round(round, "x", num,arr,m ) 
                    } else if (arr[m-1] === "/"){
                        value = Round(round-1, "/", num, arr, m)
                        num = Round (round , '/', num, arr, m) 
                    }
                     m -= 2
                }
                if(arr[m-1] === "-" && value !== 0){
                    result -= num - value          
                }else if ((arr[m-1] === "+" || arr[m-1] === undefined) && value !== 0){
                    result += num - value
                }
        
            }
            else if (arr[i + 1] === "/") {
        
                if (arr[i - 1] === "+" || arr[i-1] === undefined) result += arr[i] / (arr[i + 2]) - arr[i]
                else if (arr[i - 1] === "-") result -= arr[i] / (arr[i + 2]) - arr[i]
                let m = i
            
                let num = 1, round = 0, value = 0
                while (arr[m - 1] === "x" || arr[m - 1] === "/") {
                    round++
                    if(arr[m-1] === "x"){
                    value = Round(round-1, "x", num, arr, m)
                    num = Round(round, "x", num,arr,m ) 
                    } else if (arr[m-1] === "/"){
                        value = Round(round-1, "/", num, arr, m)
                        num = Round (round , '/', num, arr, m) 
                    }
                     m -= 2
                }
                if(arr[m-1] === "-" && value !== 0){
                    //result /= num/ value
                    result *= -num / value  
                }else if((arr[m-1] === "+" || arr[m-1] === undefined) && value !== 0){
                   // result /= num / value
                   result *= num /value
                    console.log(result)
                }
        
        
            }
        
            this.setState({result, data: [`${result}`]})
        }
    }
    render() {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <table>
                    <tr>
                        <td colSpan="3"> <input value={this.state.result} /></td>
                        <td><button onClick={() => this.setState({result : 0, data:[""]})}> c </button></td>
                    </tr>
                    <tr>
                        <td><button onClick={() => this.addNumber('7')}> 7 </button></td>
                        <td><button onClick={() => this.addNumber('8')}> 8 </button></td>
                        <td><button onClick={() => this.addNumber('9')}> 9 </button></td>
                        <td><button onClick={() => this.addOps("+")}> + </button></td>
                    </tr>
                    <tr>
                        <td><button onClick={() => this.addNumber('4')}> 4 </button></td>
                        <td><button onClick={() => this.addNumber('5')}> 5 </button></td>
                        <td><button onClick={() => this.addNumber('6')}> 6 </button></td>
                        <td><button onClick={() => this.addOps("-")}> - </button></td>
                    </tr>
                    <tr>
                        <td><button onClick={() => this.addNumber('1')}> 1 </button></td>
                        <td><button onClick={() => this.addNumber('2')}> 2 </button></td>
                        <td><button onClick={() => this.addNumber('3')}> 3 </button></td>
                        <td><button onClick={() => this.addOps('x')}> x </button></td>
                    </tr>
                    <tr>
                        <td colSpan="2"><button onClick={() => this.addNumber('0')}> 0 </button></td>
                        <td><button onClick={this.handleResult}> = </button></td>
                        <td><button onClick={() => this.addOps('/')}> % </button></td>
                    </tr>


                </table>
            </div>
        )
    }
}
