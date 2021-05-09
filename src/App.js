import React from "react";


class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      text:'',
      list:[]
    }
  }

  changeText = (event) => {
    this.setState({
      text: event.target.value
    }
    )}

    addTask = () =>{
      if (this.state.text.trim()) {  // if to prevent empty strings add. trim delete empty strings from back and end of word/ secntece

      const newTask = {
        text: this.state.text,
        isComleted: false,
      };  
      this.setState({
        list: this.state.list.concat(newTask),
        text:''
      });
    } else {
      this.setState({
        text: ''
      })
    }
    

    
      

    }

    updateStatus = (task) => {
      // working with index

      // const task = this.state.list[index];  // array in index place
      // task.isComleted = !task.isComleted // if true make false and vice versa
      // const list = this.state.list.slice();// dont want to change the state.list so create a copy not push!!!
      // list.splice(index, 1 , task)  // in index place erase 1 and enter task cons
      // //make a copy of state.list

      // this.setState({
      //   list: list
      // })
      

      // sol 2  working with task object
      // could do it with const ...
      this.setState({
        list: this.state.list.map((taskItem) =>  taskItem === task ? {text: taskItem.text, isComleted: !taskItem.isComleted} : taskItem) // return the change in task else return task only
      });
    }
    changeFilter = (e) => {
      this.setState({
        filter: e.target.value
      })
    }

    handleSubmit = (e) => {
      // if dont want to submit
      e.preventDefault();// prevent from chrome to activate event like submit from button 
      this.addTask(); // use addTask() from above function will prevent refresh of page and add with enter also
    }
    removeTask = (task) =>{
      if ( !task.isComleted) {
      const confirmed = window.confirm("are you sure??")
     if(confirmed) {
      this.setState({
        list: this.state.list.filter((taskItem) => !(taskItem === task))
      })
    }
    }
    else {
      this.setState({
        list: this.state.list.filter((taskItem) => !(taskItem === task))
      })
    }
  }
  render(){
    const allTasks = this.state.list.filter(task => {
      // if (this.state.filter === 'all') {return true;}
      if (this.state.filter === 'active') {return !task.isComleted;}
      if (this.state.filter === 'completed') {return task.isComleted;}
      return true;
    }).map((task, index) => {
    return(
     <div key={index}>
      <input type="checkbox" checked={task.isComleted} onChange={()=> this.updateStatus(task)}></input>
       {task.text}
      <button onClick={() => this.removeTask(task) }>remove</button>
       </div>
    )
    
    })
  return (
    <div>
      <form onSubmit={this.handleSubmit}>
       <select value={this.state.filter} onChange={this.changeFilter}>
         <option value={'all'}>show all</option>
         <option value={'active'}>show active</option>
         <option value={'completed'}>show completed</option>
       </select>
        <input value={this.state.text} onChange={this.changeText} type='text' placeholder='add new task'></input>
        <button type="button" onClick={this.addTask}>Add </button>
        </form>
      <div>
        {allTasks}
      </div>
    </div>
  );
}
}
export default App;
