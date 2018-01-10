import React, {Component} from 'react';
import Ingredients from './Ingredients';
import IngredientList from './IngredientList';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'jspiixrr';
const CLOUDINARY_UPLOAD_URL =  'https://api.cloudinary.com/v1_1/de75qrmc3/upload';
class Submit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: JSON.parse(localStorage.getItem('recipes')) || [],
      newRecipe : {
        name:"New Recipe",
        description:"Description",
        ingredients:[]

      },uploadedFileCloudinaryUrl: ''
    };
    this.submitRecipe = this.submitRecipe.bind(this);
    this.onImageDrop=this.onImageDrop.bind(this);
  }
  submitRecipe(){
    console.log('button clicked');
    console.log(this.name.value,this.description.value);

    let newRecipe = this.state.newRecipe;
    newRecipe.name = this.name.value;
    newRecipe.description = this.description.value;
    newRecipe.image = this.state.uploadedFileCloudinaryUrl;
    this.setState({newRecipe: newRecipe});

    let recipes = this.state.recipes;
    recipes.push(newRecipe);

    this.setState({recipes});
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.props.history.push('/');
    console.log(newRecipe);
  }

  addIngredient(quantity, ingredient) {
    console.log("Add Ingredients in Submit js", quantity, ingredient);
    let newRecipe = this.state.newRecipe;
    newRecipe.ingredients.push({quantity: quantity, ingredient: ingredient});
    this.setState({newRecipe: newRecipe});
    console.log(newRecipe);
  }
  onImageDrop(files){
    this.setState({
     uploadedFile: files[0]
   });

   this.handleImageUpload(files[0]);
  }
  handleImageUpload(file) {
     let upload = request.post(CLOUDINARY_UPLOAD_URL)
                         .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                         .field('file', file);

     upload.end((err, response) => {
       if (err) {
         console.error(err);
       }

       if (response.body.secure_url !== '') {
         this.setState({
           uploadedFileCloudinaryUrl: response.body.secure_url
         });
       }
     });
   }
  render() {
    return (
      <div className = "row">
        <div className = "col-xs-12 col-sm-12">
        <h2>Submit</h2>
    <form>
      <Dropzone
        multiple ={false}
        accept = "image/*"
        onDrop={this.onImageDrop}>
        <p>Drop an image or click  to select a file to upload.</p>
        </Dropzone>
        <div>
        {this.state.uploadedFileCloudinaryUrl === '' ? null :
        <div>
          <p>{this.state.uploadedFile.name}</p>
          <img alt={this.state.uploadedFile.name} src={this.state.uploadedFileCloudinaryUrl} />
        </div>}
      </div>
      <div className="form-group">
       <label htmlFor="name">Name</label>
       <input type="text"
              ref ={(input) => {this.name = input;}}
              className="form-control"
              id="name"
              placeholder="Enter the name of the recipe"/>
      </div>
     <div className="form-group">
       <label htmlFor="description">Description</label>
       <textarea  className="form-control"
                  id="description"
                  ref ={(input) => {this.description = input;}}
                  placeholder="Enter a brief description"/>
     </div>
     <IngredientList recipe = {this.state.newRecipe}/>
     <Ingredients addIngredient = {(quantity, ingredient)=>{this.addIngredient(quantity, ingredient)}}/>

     <button type="submit" className="btn btn-default" onClick ={this.submitRecipe}>Submit</button>
    </form>
          </div>
          </div>
        );
      }
    }

export default Submit;
