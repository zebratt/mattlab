import React from 'react';

export class Foo extends React.Component<any, any> {
  id: string;

  constructor(props: any) {
    console.log('foo constructor invoked!')
    super(props);
    this.id = 'id-foo-1';
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
        <h1>Foo {this.id}</h1>
        <div>count: {this.state.count}</div>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          increase
        </button>
      </div>
    );
  }
}

export class Foo2 extends React.Component<any, any> {
  id: string;

  constructor(props: any) {
    console.log('foo2 constructor invoked!')
    super(props);
    this.id = 'id-foo-2'
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
        <h1>Foo2 {this.id}</h1>
        <div>count: {this.state.count}</div>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          increase
        </button>
      </div>
    );
  }
}