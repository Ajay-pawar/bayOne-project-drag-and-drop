import React, { Component } from "react";
import Header from "./header";
//importing below details(data)
import details from "./details.js";
//installed react-list-drag-and-drop and importing RLDD for drag and drop functionality
import RLDD from "react-list-drag-and-drop/lib/RLDD";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      startindex: 0,
      counter: 5,
      items: []
    };
    //binding this context to itemRenderer and handleRLDDChange
    this.itemRenderer = this.itemRenderer.bind(this);
    this.handleRLDDChange = this.handleRLDDChange.bind(this);
  }

  //slicing only first 5 objects to loop through to display only 5 items initially and storing them in "items". increasing counter by 5 so next time 10 objects will load.
  componentDidMount() {
    let items = details.slice(this.state.startindex, this.state.counter);
    console.log(items)
    this.setState(preState => ({ items, startindex: preState.counter, counter: preState.counter + 5 }));
  }


  //css for the details list
  detailStyles = {
    backgroundColor: "#f4f4f4",
    padding: "10px",
    borderBottom: "1px #ccc dotted",
    cursor: "grab"
  };


  //Load More button CSS
  buttonStyle = {
    backgroundColor: "olive",
    color: "white",
    minWidth: "100px",
    width: "auto",
    height: "30px",
    padding: "6px",
    fontWeight: "bold"
  };

  //onclick of button increasing the counter by 5 so more items are loaded each time it's clicked 
  showMore = () => {
    let tmpItems = this.state.items;
    let items = details.slice(this.state.startindex, this.state.counter);
    tmpItems.push(...items);
    this.setState(preState => ({ items: tmpItems, startindex: preState.counter, counter: preState.counter + 5 }));
  };

  //on checkbox check/uncheck toggle between completed boolean true/false and chance textDecoration property accordingly 
  onCheck = id => {
    details.map(el => {
      if (el.id === id) {
        el.completed = !el.completed;
        document.getElementById(id).style.textDecoration = el.completed
          ? "line-through"
          : "none";
      }
    });
  };
  handleRLDDChange(reorderedItems) {
    this.setState({ items: reorderedItems });
  }

  //returning jsx to be displayed on UI
  itemRenderer(item) {
    return (
      <div key={item.id} id={item.id} style={this.detailStyles}>
        <input
          type="checkbox"
          onChange={this.onCheck.bind(this, item.id)}
        ></input>{" "}
        <span>{item.details}</span>
      </div>
    );
  }
  render() {
    return (
      <div className="App">
        <Header />
        {/* third party component for making list items draggable */}
        <RLDD
          cssClasses="example"
          items={this.state.items}
          itemRenderer={this.itemRenderer}
          onChange={this.handleRLDDChange}
        />

        {/* button to load more items. changing button label when no more items to display */}
        <button style={this.buttonStyle} onClick={this.showMore} disabled={this.state.items.length >= details.length ? true : false}>
          {this.state.items.length >= details.length ? "No more items to display...." : "Load More"}

        </button>
      </div>
    );
  }
}

export default App;
