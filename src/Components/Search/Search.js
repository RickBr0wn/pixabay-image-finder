import React from 'react'

// Components
import TextField from 'material-ui/TextField/TextField'
import SelectField from 'material-ui/SelectField'
import MenuField from 'material-ui/MenuItem'
import { Menu, MenuItem } from 'material-ui'

class Search extends React.Component{
  state = {
    searchText: '',
    amount: 15,
    proxyUrl: 'https://cors-anywhere.herokuapp.com/',
    apiUrl: 'https://pixabay.com/api',
    apiKey: '9025011-e7b31b8d4c70a0dc8e18e48a2',
    images: []
  }

  onTextChange = event => {
    const URL = this.state.apiUrl + '/?key='
                  + this.state.apiKey + '&q='
                  + this.state.searchText
                  + '&image_type=photo&per_page='
                  + this.state.amount
                  + '&safesearch=true'
                  
    this.setState({ [event.target.name]: event.target.value }, 
      () => {
        fetch(this.state.proxyUrl + URL)
          .then(res => res.json())
          .then(result => this.setState({ images: result.hits }))
          .catch(error => console.log(error))
      })
  }

  onAmountChange = (event, index, value) => this.setState({ amount: value})

  render(){
    console.log(this.state.images)
    return(
      <div>
        <TextField  name="searchText"
                    value={this.state.searchText}
                    onChange={this.onTextChange}
                    floatingLabelText="Search For Images"
                    fullWidth={true} />
        <br />
        <SelectField  name="amount" 
                      floatingLabelText="Amount"
                      value={this.state.amount}
                      onChange={this.onAmountChange}>
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={30} primaryText="30" />
          <MenuItem value={50} primaryText="50" />
        </SelectField>
        <br />
      </div>
    )
  }
}

export default Search