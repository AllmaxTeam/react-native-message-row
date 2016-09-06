## react-native-message-row

![screen](https://raw.githubusercontent.com/AllmaxTeam/react-native-message-row/master/message-row.png)

## Usage
```javascript
renderRow(message, sectionId, rowId) {
        const { currentUser } = this.props
        const isFromCurrentUser = message.from.id === currentUser.id
        const color = isFromCurrentUser ? '#75ADFF' : 'white'
        const avatarURL = message.from.avatar
        let avatarSource
        if (avatarURL) {
            avatarSource = {uri: avatarURL}
        }
        return (
            <MessageRow
                isFromCurrentUser={isFromCurrentUser}
                avatarSource={avatarSource}
                text={message.text}
                color={color}
                headerText={Moment(message.date).fromNow()}
            />
        )
    }
```

## Default props
```javascript
MessageRow.defaultProps = {
    isFromCurrentUser: false,
    headerText: '',
    headerTextStyle: {},
    avatarSize: 40,
    arrowSize: 8,
    color: 'white',
    borderRadius: 8,
    contentViewPadding: 8,
    text: '',
    avatarSource: null
}
```