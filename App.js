
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import React, {useState, useEffect} from 'react';

const URL = 'http://www.boredapi.com/api/activity/';

export default function App() {
  const [refresh, setRefresh] = useState();
  const [activity, setActivity] = useState('');
  const [type, setType] = useState('');
  const [participants, setParticipants] = useState(null);
  const [price, setPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(URL)
     .then(response => response.json())
     .then ((json) => {
        const data = json;
        setActivity(firstLetterToLowerCase(data.activity));
        setType(data.type);
        setParticipants(data.participants);
        setPrice(data.price)
        setError(null);
        setIsLoading(false);
     }, (error) => {
          setError("Error retrieving the activity!");
          setIsLoading(false);
          console.log(error);
     })
   }, [refresh])

  const getNewActivity = () => {
    setRefresh({});
  }

  const chekPrefix = (str) => {
    if (str.charAt(0) === 'a' || str.charAt(0) === 'e' || str.charAt(0) === 'i' || str.charAt(0) === 'o' || str.charAt(0) === 'u') {
      return 'an';
    } else {
      return 'a ';
    }
  }

  const firstLetterToLowerCase = (str) => {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  if (isLoading) {
    return <View style={styles.container}><ActivityIndicator size='large'/></View>
  }
  else if (error) {
    return <View style={styles.container}><Text>{error}</Text></View>
  }
  else {
    return (
      <View style={styles.container}>
              <Text style={styles.heading}>I'm so bored...</Text>
        <Text style={styles.text}>As {chekPrefix(type)} {type} type of activity {activity}. 
          It takes {participants === 1 ? participants + ' participant' : participants + ' participants' } 
          and {price === 0 ? 'does not cost anything' : 'is propably quite cheap'}.
         </Text>
      <Button style={styles.button} onPress={() => getNewActivity()} title='Refresh'></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    marginLeft: 10,
    marginRight:10,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginTop: 30,
    marginBottom: 30,
  },
});
