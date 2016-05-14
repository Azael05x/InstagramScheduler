import {
  StyleSheet
} from 'react-native';

module.exports = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 3,
    marginLeft: -1,
    marginRight: -1,
  },
    containerProfile: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 50
    },
      containerProfileImage: {
        height: 40,
        width: 40,
        marginLeft: 10,
        borderRadius: 99
      },
      profileText: {
        marginLeft: 10,
        color: '#125688',
        fontWeight: '500',
      },
      containerProfileTime: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: 10,
      },
        profileTime: {
          color: '#125688',
          fontWeight: '500',
        },
    containerImage: {
      height: 306,
      flex: 1,
    },
      thumbnail: {
        height: 306,
        borderRadius: 0
      },
    containerDetails: {
      height: 50,
      justifyContent: 'space-between',
      alignItems: 'stretch',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignSelf: 'stretch'
    },
      containerPublish: {
        height: 50,
        backgroundColor: '#34495e',
        flexDirection: 'row',
        alignSelf: 'stretch',
        borderRadius: 0,
        paddingLeft: 12,
        paddingRight: 12,
        justifyContent: 'center'
      },
        detailsPublish: {
          color: '#fff',
          fontWeight: '500',
          textAlign: 'center'
        },
      containerPublishDisabled: {
        height: 50,
        backgroundColor: '#7f8c8d',
        alignSelf: 'stretch',
        borderRadius: 0,
        paddingLeft: 12,
        paddingRight: 12,
        justifyContent: 'center'
      },
      commentButton: {
        borderRadius: 0,
        height: 50,
        alignSelf: 'stretch',
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: "#34495e",
        justifyContent: 'center'
      },
      dateButton: {
        borderRadius: 0,
        height: 50,
        alignSelf: 'stretch',
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: "#2ecc71",
        justifyContent: 'center'
      }

});
