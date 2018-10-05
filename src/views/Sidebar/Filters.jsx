import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as propTypes from 'prop-types';
import { osList, searchFilterItem } from '../../services/service/action';
import {
    map as _map,
    keysIn as _keysIn,
    find as _find,
    compact as _compact,
    includes as _includes,
    differnce as _differnce


} from 'lodash';


import SelectField from '../../components/SelectField';
import SelectFieldOne from '../../components/SelectFieldOne';
import './../../asserts/css/style.css';


class Filter extends Component {

    state = {
        sliderValue: "",
        category: "",
        artist: "",
        isChecked: true,
        propertiesVisible: false,
        deckDescription: "",
        sortedByName: "",
        itemCreator: "",
        itemTokenId: "",
        itemOwnerName: "",
        coolGeneration: "",
        selectGeneration: "",
        createrEnabled: false,
        filterData: [],
        sortBy :this.props.sortBy
    }

    static propTypes = {
        onTypeChange: propTypes.func,
        isVisible: propTypes.bool,
        decksList: propTypes.any,
        sortedByName: propTypes.any,
        sortBy:propTypes.any
    }

    componentDidMount() {
        this.props.osList()

    }

    clearFields = () => {
        this.setState({ itemTokenId: "", itemOwnerName: "", selectGeneration: "", CoolGeneration: "", itemCreator: ""  ,sortBy:"null"});
        
    }

    handleChange = (event) => {
        this.setState({
            sliderValue: event.target.value, deckDescription: event.target.value

        })
    }

    CoolGeneration = (event) => {
        this.setState({ coolGeneration: event.target.value, sliderValue: event.target.value })
    }

    getItemTokenId = (event) => {
        event.preventDefault();
        this.setState({ itemTokenId: event.target.value })
    }

    getItemOwnerName = (event) => {
        event.preventDefault();
        this.setState({ itemOwnerName: event.target.value })
    }


    handleChangeSelect = (event) => {
        event.preventDefault();

        //filterData
        const selected = _map(this.props.osListInfo, function (each, i) {
            if (each.address === event.target.value) {
                return each;
            }
        })

        this.setState({ filterData: selected, itemCreator: event.target.value, createrEnabled: true })

        //this.setState({ itemCreator: this.state.itemChosen.find(x => x.name == event.target.value).address, createrEnabled: true }) // client
        if (event.target.value === "") {
            this.setState({ propertiesVisible: false })
        } else {
            this.setState({ propertiesVisible: true })
        }

    }
    //fet deck toggle value
    getCheckedValue = () => {

        this.setState({
            isChecked: !this.state.isChecked
        }, () => this.props.onTypeChange(this.state.isChecked));

        if (this.state.isChecked === true) {
            this.setState({ createrEnabled: true })
        }

    }

    //STO submit function
    filterSubmit = (event) => {
        event.preventDefault();
        //deck
        if (this.state.isChecked === true) {
            const ContractInfo = this.props.osListInfo && _find(this.props.osListInfo, { address: this.state.itemCreator });
            const data = {
                orderby: this.props.sortedByName || "",
                owners: this.state.itemOwnerName || "",
                contract: ContractInfo.address || "",
                tokenId: this.state.itemTokenId || "",
                limit: 15,
                Offset: 0,
                order: "asc",
                traits: [{ Value: this.state.coolGeneration, Type: "number", Name: "cool" },

                { Value: this.state.artist, Type: "string", Name: "artist" },
                { Value: this.state.category, Type: "string", Name: "category" }
                ]

            }

            this.props.searchFilterItem(data)

        } else {
            //item
            const data = {
                orderby: this.props.sortedByName || "",
                owners: this.state.itemOwnerName || "",
                tokenId: this.state.itemTokenId || "",
                limit: 15,
                Offset: 0,
                order: "asc"

            }

            this.props.searchFilterItem(data)
        }
    }

    //ENO  submit function

    handleSelect = (event) => {
        event.preventDefault();
        this.setState({
            artist: event.target.value
        })
    }

    handleCategorySelect = (event) => {
        event.preventDefault();
        this.setState({ category: event.target.value })

    }

    render() {

        const { isVisible, osListInfo } = this.props;
        const { isChecked, propertiesVisible, createrEnabled, filterData } = this.state;
        const listObj = _compact(filterData)
        const traitsInfo = _map(listObj, "traits");
        const nameList = traitsInfo[0] && _keysIn(traitsInfo[0]);
     

        return (
            <aside>
                <div id="side-bar" className={`navbar-collapse ${isVisible ? 'hide-left-bar ' : ''}`}>
                    <h2 className="filterText">Filter</h2>
                    <div className="form-group">
                        <label className="labeldeck"> deck</label>
                        <label className="filterswitch">
                            <input type="checkbox" checked={isChecked} value="true" onChange={this.getCheckedValue} />
                            <span className="filterslider round"></span>
                        </label>
                        <label className="labelitem"> item</label>
                    </div>

                    {isChecked === true &&
                        <div>
                            <div className="form-group">
                                <span className="creater">Creator [44]:</span>
                                <div className="selectcreateDiv">
                                    <SelectFieldOne
                                        className="selectCreater"
                                        onChange={(event) => this.handleChangeSelect(event)}
                                        // name="manufacture_speed"
                                        defaultOption={{ value: '', label: 'select a creator to search' }}
                                        options={osListInfo}
                                        value={this.state.itemCreator}>
                                    </SelectFieldOne>
                                </div>
                            </div>

                            {propertiesVisible &&
                                <div>
                                    <div className="filter-section"></div>
                                    <h2 className="filterText">Search by properties </h2>
                                    <div className="searcbyPropBg">
                                        <span style={{ color: "red", fontSize: "8px" }}>
                                        </span>
                                        <p className="searchByText"> {nameList && nameList[0]}:</p>
                                        <div className="rangeSlideDiv">
                                            <label>{nameList && nameList[0]}</label>
                                            <input type="range" name="coolGeneration" onChange={this.CoolGeneration}
                                                min={traitsInfo[0].cost && traitsInfo[0].cost.min}
                                                max={traitsInfo[0].cost && traitsInfo[0].cost.max} defaultValue="" />
                                        </div>
                                        <p className="Slider-value"> {this.state.coolGeneration} </p>
                                        <p className="searchByText">Cattribute:  </p>
                                        <div className="contriList">
                                            <span className="contriName">{nameList && nameList[1]}</span>
                                            {/* <div className="selectcreateDiv">
                                                <select className="selectCreater"  >
                                                    <option value='' > type or select traits</option>
                                                    {_map(traitsInfo[0].artist, (i, each) => (
                                                        <option key={i} name="creater">  {each}  </option>)
                                                    )}</select>

                                            </div> */}
                                            <div className="selectcreateDiv">
                                                <SelectField
                                                    className="selectCreater"
                                                    onChange={(event) => this.handleSelect(event)}
                                                    // name="manufacture_speed"
                                                    defaultOption={{ value: '', label: 'type or select traits' }}
                                                    options={traitsInfo[0].artist}
                                                    value={this.state.artist}>
                                                </SelectField>
                                            </div>
                                        </div>
                                        <div className="contriList">
                                            <span className="contriName">{nameList && nameList[2]}</span>
                                            <div className="selectcreateDiv">
                                                <SelectField
                                                    className="selectCreater"
                                                    onChange={(event) => this.handleCategorySelect(event)}
                                                    // name="manufacture_speed"
                                                    defaultOption={{ value: '', label: 'type or select traits' }}
                                                    options={traitsInfo[0].category}
                                                    value={this.state.category}>
                                                </SelectField>
                                            </div>
                                        </div>
                                        {/* onChange={() => this.getCheckedNorth(traitsInfo[0])} */}
                                        {/* <div className="form-group">
                                            <label className="labeldeck"> {nameList && nameList[3]} </label>
                                            <label className="filterswitch">
                                                <input type="checkbox" checked={traitsInfo[0].wind && traitsInfo[0].wind.north === 1} value="true" />
                                                <span className="filterslider round"></span>
                                            </label>
                                            <label className="labelitem"> {nameList && nameList[3]}</label>
                                        </div> */}
                                    </div>
                                    <h2 className="filterText">Search by IDs</h2>
                                    <div className="searcbyPropBg">
                                        <div className="form-group">
                                            <span className="creater">Token ID:</span>
                                            <input type="text" name="itemTokenId" value={this.state.itemTokenId} onChange={this.getItemTokenId} className="searchByIdInp" />
                                        </div>
                                        <div className="form-group">
                                            <span className="creater">Owner's Name:</span>
                                            <input type="text" name="itemOwnerName" value={this.state.itemOwnerName} onChange={this.getItemOwnerName} className="searchByIdInp" />
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>}

                    {isChecked === false && <div>
                        <h2 className="filterText">Search by IDs</h2>
                        <div className="searcbyPropBg">
                            <form >
                                <div className="form-group">
                                    <span className="creater">Token ID:  </span>
                                    <input type="text" name="itemTokenId" value={this.state.itemTokenId} onChange={this.getItemTokenId} className="searchByIdInp" />
                                </div>
                                <div className="form-group">
                                    <span className="creater">Owner's Name:</span>
                                    <input type="text" name="itemOwnerName" value={this.state.itemOwnerName} onChange={this.getItemOwnerName} className="searchByIdInp" />
                                </div>
                            </form>
                        </div>
                    </div>}
                    <div className="footer-section">
                        <button type="submit" className="grayGoastBtn smallBtn" disabled={!createrEnabled} onClick={this.clearFields} >Clear all filters</button>
                        <button type="submit" className="grayGoastBtn smallBtn pull-right" disabled={!createrEnabled} onClick={this.filterSubmit} >Search</button>
                    </div>
                </div>
            </aside>
        );

    }
}

const mapStateToProps = (state) => ({
    discoveryListInfo: state.service.discoveryListInfo,
    osListInfo: state.service.osListInfo,
});
const mapDispatchToProps = dispatch => ({
    osList: () => dispatch(osList()),

    searchFilterItem: (data) => dispatch(searchFilterItem(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(Filter);