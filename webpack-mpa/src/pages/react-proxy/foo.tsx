import React from 'react';

export class Foo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount(){
    console.log('foo did mount')
  }

  render() {
    return (
      <div>
        <h1>Foo</h1>
        <div>count: {this.state.count}</div>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          increase
        </button>
      </div>
    );
  }
}

export class Foo2 extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount(){
    console.log('foo2 did mount')
  }

  render() {
    return (
      <div>
        <h1>Foo2</h1>
        <div>count: {this.state.count}</div>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          increase
        </button>
      </div>
    );
  }
}