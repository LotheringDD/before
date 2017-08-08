import React, { Component } from 'react';
import './App.css';
import './reset.css'
import './content.css';
import { Button } from 'antd';
import Content from './content'
import $ from 'jquery';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

class App extends Component {
    constructor(){
        super()

    }

    render() {
        var that=this;
        return (
            <Router>
                <div className="wrap">
                    <Link to="/"></Link>
                    <Route exact path='/' component={Apps} />
                    <Route path="/:id" component={Content}/>
                </div>
            </Router>
        );
    }
}
class Apps extends Component {
    constructor (){
        super()
        this.state={
            arr:[]
        }
    }
    componentDidMount(){
        $.ajax({
            url:"http://localhost:8005/news",
            type:"post",
            success:function (opt){
                this.setState({
                    arr:opt
                })
            }.bind(this)
        })
    }
    handleClick (x){
        return function () {
            $.ajax({
                url:"http://localhost:8005/news/delete",
                type:"post",
                data:{id:x},
                success:function (e){
                    $.ajax({
                        url:"http://localhost:8005/news",
                        type:"post",
                        success:function (opt){
                            this.setState({
                                arr:opt
                            })
                        }.bind(this)
                    })
                }.bind(this)
            })
        }.bind(this);
    }

    render (){
        return (
            <ul className="new-in">
                {this.state.arr.map(function (v,i){
                    return (<li key={i}>
                        <Link to={`/content:${v.id}`}>
                            <p>
                                <span className="new-id">{v.id}</span>
                                <span className="new-tit">{v.title}</span>
                            </p>
                        </Link>
                        <Button type="primary" >修改</Button>
                        <Button type="danger" onClick={this.handleClick(v.id)}>删除</Button>
                    </li>)
                }.bind(this))}
            </ul>
        )
    }
}

export default App;