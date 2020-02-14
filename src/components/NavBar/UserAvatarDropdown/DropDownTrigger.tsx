import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Image, Loader } from 'semantic-ui-react';
import { WHO_IS_ME } from '../../../GraphQl/Queries/Auth';

const DropDownTrigger: React.FC = () => {
  const { loading, data } = useQuery(WHO_IS_ME);
  const { username, displayName } = data.me;
  const { url } = data.me.profile.picture;
  const [userName, setUserName] = useState();

  useEffect(() => {
    if (username) {
      setUserName(username);
    } else {
      setUserName(displayName);
    }
  }, [username]);

  return (
    <span>
      <Image avatar src={url} />
      {userName}
      <Loader active={loading} size="tiny" />
    </span>
  );
};

export default DropDownTrigger;
