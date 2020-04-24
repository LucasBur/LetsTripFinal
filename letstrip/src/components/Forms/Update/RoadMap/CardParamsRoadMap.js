import React from 'react'
import { Card } from 'react-bootstrap'
import { FormInviteToRoadMap } from './FormInviteToRoadMap'
import { FormUpdateRoadmap } from './FormUpdateRoadmap'


class CardParamsRoadMap extends React.Component {

    constructor(props){
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Card className="mb-3">
                    <Card.Header>
                        Mettez à jour les informations de la Roadmap
                    </Card.Header>
                    <Card.Body>
                        <FormUpdateRoadmap
                            rmId={this.props.rmId}
                            rmName={this.props.rmName}
                            rmPassword={this.props.rmPassword}
                            rmNbrParticipants={this.props.rmNbrParticipants}
                            rmStartDate={this.props.rmStartDate}
                            rmEndDate={this.props.rmEndDate}
                            rmLocation={this.props.rmLocation}
                            rmBudget={this.props.rmBudget}
                            rmLeader={this.props.rmLeader}
                            notify={this.props.notify}
                            getRoadmap={this.props.getRoadmap}
                            switchContent={this.props.switchContent} />
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Header>
                        Inviter des membres à la RoadMap
                    </Card.Header>
                    <Card.Body>
                        <FormInviteToRoadMap roadMapId={this.props.rmId}/>
                    </Card.Body>
                </Card>
            </div>            
        )
    }
}

export default CardParamsRoadMap