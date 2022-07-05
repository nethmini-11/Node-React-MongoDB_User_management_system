import React, { Component } from 'react'
import Container  from "react-bootstrap/Container";
import axios from 'axios';

export default class Adduser extends Component {

    constructor(props){
        super(props);
        this.state={
            markingSchemaName:"",
            markingSchemaNumber:"",
            addedDate:"",
            evaluateArea:"",
            marks:""
        }
    }

    handleInput = (e) => {
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {markingSchemaName,markingSchemaNumber,addedDate,evaluateArea,marks} = this.state;
        const data = {
            markingSchemaName:markingSchemaName,
            markingSchemaNumber:markingSchemaNumber,
            addedDate:addedDate,
            evaluateArea:evaluateArea,
            marks:marks
        }
        console.log(data);

        axios.post("http://localhost:5000/MarkingSchema/add",data).then((res) => {
            if(res.data.success){
                alert("MarkingSchema Added Successfully!")
                this.setState(
                    {
                        markingSchemaName:"",
                        markingSchemaNumber:"",
                        addedDate:"",
                        evaluateArea:"",
                        marks:""
                    }
                )
            }
        })
    }

    render() {
        return (
            <Container>
                <br></br><br></br><h4>Add New Marking Schema</h4><br></br><hr></hr><br></br>
            <form className="row g-3">

                    <div className="col-md-6">
                        <label className="form-label">Marking Schema Name</label>
                        <select name="markingSchemaName" className="form-select" 
                            value={this.state.markingSchemaName}
                            onChange={this.handleInput}>
                            <option>Choose...</option>
                            <option>Presentations</option>
                            <option>Topic Evaluation</option>
                            <option>Document Evaluation</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Marking Schema Number</label>
                        <input type="text" className="form-control" name="markingSchemaNumber" placeholder="MS-000"
                            value={this.state.markingSchemaNumber}
                            onChange={this.handleInput} />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Date</label>
                        <input type="text" className="form-control" name="addedDate" placeholder="YYYY-MM-DD"
                            value={this.state.addedDate}
                            onChange={this.handleInput} />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Evaluate Area</label>
                        <input type="text" className="form-control" name="evaluateArea" placeholder="Demo / Viva"
                            value={this.state.evaluateArea}
                            onChange={this.handleInput} />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Marks</label>
                        <input type="text" className="form-control" name="marks" placeholder="Eg: 10/10" disabled
                            value={this.state.marks}
                            onChange={this.handleInput} />
                    </div>

                    <br/><br/>
                    <hr/>
                    <br></br><br></br>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Add Marking Schema</button>
                    </div>
            </form>
            <a href="/allmarking" className="btn btn-danger my-2">
          Reload Contact
        </a>
            <br/><br/><br/><br/>
            </Container>
            
        )
    }
}