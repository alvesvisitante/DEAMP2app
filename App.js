import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import Login from './screens/Login';
import Register from './screens/Register';
import Dashboard from './screens/Dashboard';
import IntimacaoList from './screens/IntimacaoList';
import IntimacaoForm from './screens/IntimacaoForm';
import IntimacaoDetails from './screens/IntimacaoDetails';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return null;

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen name='Dashboard' component={Dashboard} />
              <Stack.Screen name='Intimacoes' component={IntimacaoList} />
              <Stack.Screen name='Nova Intimacao' component={IntimacaoForm} />
              <Stack.Screen name='Detalhes' component={IntimacaoDetails} />
            </>
          ) : (
            <>
              <Stack.Screen name='Login' component={Login} />
              <Stack.Screen name='Registrar' component={Register} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
