import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Loader from '../../Helper/Loader';

import {confirmAlert} from 'react-confirm-alert';
import './react-confirm-alert.css'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import * as teamProductManageAction from '../../../actions/teamProductManageAction'
import ENVIRONMENT_VARIABLES from "../../../environment.config";
import NotificationSystem from 'react-notification-system';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? '#ffd204' : 'white',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'rgba(0,0,0,.87)',
    padding: grid,
    width: 250
});


class ManageTeamMemberProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            selected: [],
            notificationSystem: null,
        };
    }

    componentWillMount() {

        if (this.props.allProductList.length === 0) {
            this.props.actions.teamProductManageAction.ProductList();
        }
        else {
            this.setState({items: this.props.allProductList || []});
        }

    }

    id2List = {
        droppable: 'items',
        droppable2: 'selected'
    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const {source, destination} = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = {items};

            if (source.droppableId === 'droppable2') {
                state = {selected: items};
            }

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                items: result.droppable,
                selected: result.droppable2
            });
        }
    };

    addNotifications = (message, level) => {
        this.state.notificationSystem.addNotification({
            message: message,
            level: level,
            autoDismiss: 5
        });
    };


    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
    };


    componentWillReceiveProps(nextProps) {
        if (!nextProps.Loading && nextProps.error_msg) {
            this.addNotifications(nextProps.error_msg, "error");
        } else if (!nextProps.Loading && nextProps.success_msg) {
            this.addNotifications(nextProps.success_msg, "success");
            this.setState({items: nextProps.allProductList || []});
        } else {
            this.setState({items: nextProps.allProductList || []});
        }
    }


    render() {

        return (
            <div className="bg-burrito-image autofill-background">
                <NotificationSystem ref="notificationSystem"/>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}>
                                {this.state.items.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}>
                                                {item.image_url !== undefined ? (
                                                    <img src={ENVIRONMENT_VARIABLES.PHOTO_URL + item.image_url}
                                                         width="50px"
                                                         height="50px"/>) : (
                                                    <img
                                                        src={ENVIRONMENT_VARIABLES.PHOTO_URL + "images/UserAvatar/demo.png"}
                                                        width="50px"
                                                        height="50px"/>)}
                                                {item.title}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <br/><br/>

                    <Droppable droppableId="droppable2">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}>
                                {this.state.selected.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}>
                                                {item.image_url !== undefined ? (
                                                    <img src={ENVIRONMENT_VARIABLES.PHOTO_URL + item.image_url}
                                                         width="50px"
                                                         height="50px"/>) : (
                                                    <img
                                                        src={ENVIRONMENT_VARIABLES.PHOTO_URL + "images/UserAvatar/demo.png"}
                                                        width="50px"
                                                        height="50px"/>)}
                                                {item.title}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                {this.props.Loading && <Loader/>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {manageTeamProductReducer} = state;
    return {
        Loading: manageTeamProductReducer.Loading,
        error_msg: manageTeamProductReducer.error_msg,
        success_msg: manageTeamProductReducer.success_msg,
        teamProductList: manageTeamProductReducer.teamProductList,
        allProductList: manageTeamProductReducer.allProductList
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        teamProductManageAction: bindActionCreators(teamProductManageAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageTeamMemberProduct);
