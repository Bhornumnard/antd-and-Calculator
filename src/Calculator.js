import React, { Component } from 'react'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import {f09a} from '@fortawesome/fontawesome-svg-core'



// function Round(n, ops, num, arr, index) {
//     for (let i = -1; i <= n; i++) {
//         if (i === -1) num = arr[index + (2 * i)]
//         else if (ops === "*") num *= arr[index + (2 * i)]
//         else if (ops === "/") num /= arr[index + (2 * i)]

//     }
//     return num
// }



export default class Calculator extends Component {
    state = {
        data: [""],
        result: 0,
        show: [],
    }
    addNumber = (num) => {
        let data = [...this.state.data];
        let lastData = data[data.length - 1];
        if (!isNaN(Number(lastData))) {
            [data[data.length - 1]] = [data[data.length - 1] + num]
            this.setState(prevState => { return prevState = { data } })
        } else {
            this.setState(prevState => { return prevState = { data: [...this.state.data, num] } })
        }
        this.setState((prevState) => {
            let input = "";
            prevState.data.forEach(str => input += str)
            return prevState = { result: input }
        })
    }
    addOps = (ops) => {
        this.setState(prevState => prevState = { data: [...this.state.data, ops] })


        this.setState((prevState) => {
            let input = "";
            prevState.data.forEach(str => input += str)
            return prevState = { result: input }
        })
    }
    handleResult = () => {
        const arr = this.state.data;
        let result = this.state.result;
        this.setState({ show: [...this.state.show, this.state.result] })
        for (let i = 0; i < arr.length - 2; i += 2) {
            if (i === 0) {
                result = +arr[i];
            }
            if (arr[i + 1] === "+") {
                result += +arr[i + 2]
            }
            else if (arr[i + 1] === "-") {
                result -= +arr[i + 2]
            }
            else if (arr[i + 1] === "x" || arr[i+1] ==="/") {
                let round = 1;
                let num = 1;
                let ops = ""
              
                if (arr[i - 1] === "-") ops = "-"
                else ops = "+"
              
                if (arr[i - 1] === "-") result += +arr[i]
                else if (arr[i - 1] === "+") result -= +arr[i]
               
                while (arr[i + 1] === "x" || arr[i + 1] === "/") {
                    if(i===0) result = 0
                    if (round === 1) {
                        if(arr[i+1] === "x")num = arr[i] * arr[i + 2]
                        else num = arr[i]/arr[i+2]
                    } else if (arr[i + 1] === "x") { num *= arr[i + 2]; }
                    else if (arr[i + 1] === "/") { num /= arr[i + 2]; }
                    round++
                    i += 2
                }
        
                if (ops === "-") result -= num
                else result += num
                i -= 2
               
        
            }
            console.log(result)
            this.setState({result})
        }

    }
    render() {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column" }}>
                <FontAwesomeIcon icon={['fab', 'apple']} style={{fontSize: "100px", paddingBottom:"20px"}}/>
               

                {/* <i style={{ color: "#4267b2", backgroundColor: "white", fontSize: "200px" }} class="fab fa-facebook-square"></i> */}
                <table>
                    <tbody>
                        <tr>
                            <td colSpan="3"> <input value={this.state.result} /></td>
                            <td><button onClick={() => this.setState({ result: 0, data: [""] })}> c </button></td>
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
                            <td><button onClick={() => this.addNumber('0')}> 0 </button></td>
                            <td><button onClick={() => this.addNumber('.')}> . </button></td>
                            <td><button onClick={this.handleResult}> = </button></td>
                            <td><button onClick={() => this.addOps('/')}> / </button></td>
                        </tr>
                    </tbody>

                </table>
                <ul>
                    {this.state.show.map((list, index) => <li key={`${list}_${index}`}>{list}</li>)}
                </ul>
            </div>
        )
    }
}
