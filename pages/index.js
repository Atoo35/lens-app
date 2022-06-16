import { useState, useEffect } from "react"
import { client, recommendProfile } from "../api"
import Link from 'next/link';
import Image from 'next/image'

export default function Home() {

  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    fetchProfiles();
  }, []);

  async function fetchProfiles() {
    try {
      const response = await client.query(recommendProfile).toPromise();
      console.log(response)
      setProfiles(response.data.recommendedProfiles)
    } catch (error) {
      console.log(error)
    } 
  }

  return (
    <div>
      {
        profiles.map((profile, index) => (
          <Link href={`/profile/${profile.id}`} key={index}>
            <a>
              <div>
                {
                  profile.picture ? (
                    profile.picture.original ? (
                      <Image 
                        src={profile.picture.original.url}
                        alt={profile.name}
                        width={60}
                        height={60}
                      />

                    ) : (
                      <Image 
                        src={profile.picture.uri}
                        alt={profile.name}
                        width={60}
                        height={60}
                      />
                    )
                  ) : (
                    <div
                      style={{width: '60px', height: '60px', backgroundColor: 'black'}}>
                    </div>
                  )
                }
                <h4>{profile.handle}</h4>
                <p>{profile.bio}</p>
              </div>
            </a>
          </Link>
        ))
      }
    </div>
  )
}
