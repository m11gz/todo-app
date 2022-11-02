import React from "react";
export const SettingsContext = React.createContext();

class SettingsProvider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showCompleted: true,
      numItems: 5,
      defaultSortField: 'title'
    }
  }

  render() {
    return (
      <SettingsContext.Provider value={this.state}>
        {this.props.children}
      </SettingsContext.Provider>
    )
  }
}

export default SettingsProvider;
