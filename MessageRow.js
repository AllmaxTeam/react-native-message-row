import React, { PropTypes } from 'react'
import { View, Dimensions, StyleSheet, Text, Image } from 'react-native'

export default function MessageRow(props) {
    const {
        style,
        isFromCurrentUser,
        headerText,
        avatarSource,
        avatarSize,
        arrowSize,
        color,
        borderRadius,
        contentViewPadding,
        text
    } = props
    let { headerTextStyle } = props
    const { width } = Dimensions.get('window')
    const headerMargin = (avatarSource ? avatarSize : 0) + arrowSize
    const defaultHorizontalPadding = style && style.paddingHorizontal || 16
    let leftPadding
    let rightPadding
    if (style) {
        leftPadding = style.padding || style.paddingHorizontal || style.paddingLeft || defaultHorizontalPadding
        rightPadding = style.padding || style.paddingHorizontal || style.paddingRight || defaultHorizontalPadding
    } else {
        leftPadding = defaultHorizontalPadding
        rightPadding = defaultHorizontalPadding
    }
    const maxContentViewWidth = width - headerMargin - leftPadding - rightPadding
    let rowStyle
    let untouchableHeaderTextStyle = {}
    let arrowStyle = {
        width: arrowSize,
        height: arrowSize,
        borderLeftWidth: arrowSize,
        borderBottomWidth: arrowSize,
        borderLeftColor: color,
        marginTop: (avatarSource ? avatarSize : 30) - 2*borderRadius - 4
    }
    if (isFromCurrentUser) {
        rowStyle = Styles.reverseRow
        untouchableHeaderTextStyle.marginRight = headerMargin
        untouchableHeaderTextStyle.textAlign = 'right'
    } else {
        rowStyle = Styles.row
        untouchableHeaderTextStyle.marginLeft = headerMargin
        arrowStyle.transform = [
            {rotateY: '180deg'}
        ]
        arrowStyle.marginRight = -1
    }
    const contentViewStyle = {
        borderRadius,
        padding: contentViewPadding,
        backgroundColor: color,
        maxWidth: maxContentViewWidth
    }
    return (
        <View style={[Styles.container, style, {paddingLeft: leftPadding, paddingRight: rightPadding}]}>
            <Text style={[Styles.headerText, headerTextStyle, untouchableHeaderTextStyle]}>{headerText}</Text>
            <View style={rowStyle}>
                {avatarSource &&
                    <Image
                        source={avatarSource}
                        style={{width: avatarSize, height: avatarSize, borderRadius: avatarSize/2}}
                        resizeMode="cover"
                    />
                }
                <View style={[Styles.arrow, arrowStyle]} />
                <View style={[Styles.contentView, contentViewStyle]}>
                    <Text style={Styles.text}>{text}</Text>
                </View>
            </View>
        </View>
    )
}

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

MessageRow.propTypes = {
    isFromCurrentUser: PropTypes.bool,
    headerText: PropTypes.string,
    headerTextStyle: PropTypes.object,
    avatarSize: PropTypes.number,
    arrowSize: PropTypes.number,
    color: PropTypes.string,
    borderRadius: PropTypes.number,
    contentViewPadding: PropTypes.number,
    text: PropTypes.string,
    avatarSource: PropTypes.any
}

const Styles = StyleSheet.create({
    container: {
        paddingVertical: 8
    },
    headerText: {
        fontSize: 8,
        color: 'gray'
    },
    row: {
        flexDirection: 'row'
    },
    reverseRow: {
        flexDirection: 'row-reverse'
    },
    arrow: {
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderBottomColor: 'transparent'
    },
    contentView: {
        justifyContent: 'center'
    },
    text: {
        backgroundColor: 'transparent'
    }
})
