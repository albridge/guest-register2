import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'ENTER GUESTS DETAILS',
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
          headerRight: () => (
            <Link href="/IpAddress" asChild>
              {/* <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="backward"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable> */}
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Guests',
          tabBarIcon: ({ color }) => <TabBarIcon name="list-alt" color={color} />,
        }}
      />



<Tabs.Screen
        name="details"
        options={{
          title: 'Guest Details View',
          headerShown: true,
          tabBarItemStyle: { display: 'none' },
          tabBarIcon: ({ color }) => <TabBarIcon name="remove" color={color} />,
        }}
      />

<Tabs.Screen
        name="Logout"
        options={{
          title: 'Logout',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="remove" color={color} />,
        }}
      />


    </Tabs>

    
  );
}
