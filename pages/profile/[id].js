import { useRouter } from "next/router";
import {
  client, getProfiles, getPublications
} from "../../api";
import { useState, useEffect } from "react";
import Image from "next/image";
 
export default function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const [profile, setProfile] = useState();
  const [pubs, setPubs] = useState([]);
  useEffect(() => {
    if(id){
      fetchProfile();
    }
  },[id]);

  async function fetchProfile(){
    try {
      const response = await client.query(getProfiles,{ id }).toPromise();
      console.log(response)
      setProfile(response.data.profiles.items[0])
      const pubData = await client.query(getPublications,{ id }).toPromise();
      console.log(pubData)
      setPubs(pubData.data.publications.items)
    } catch (error) {
      console.log(error)
    }
  }

  if(!profile){ return <div>Loading...</div> }
  return (
    <div>
      {
        profile.picture ? (
          profile.picture.original ? (
            <Image
              src={profile.picture.original.url}
              alt={profile.name}
              width={200}
              height={200}
            />

          ) : (
            <Image
              src={profile.picture.uri}
              alt={profile.name}
              width={200}
              height={200}
            />
        )
        ) : (
          <div
           style={{width: '200px', height: '200px', backgroundColor: 'black'}}>
          </div>
        )
      }
      <div>
        <h4>{profile.handle}</h4>
        <p>{profile.bio}</p>
        <p>Followers: {profile.stats.totalFollowers}</p>
        <p>Following: {profile.stats.totalFollowing}</p>
      </div>
      <div>
        {
          pubs.map((pub, index) => (
            <div key={index} style={{padding:'20px', borderTop:'1px solid black'}}>
              <h4>{pub.metadata.content}</h4>
            </div>
          ))
        }
      </div>
    </div>
  );
}