import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./components.css";

export default function AddressResolver({ id }) {
  const [ensDomain, setEnsDomain] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function resolveAddress() {
      setLoading(true);
      try {
        // Create a provider and ENS instance
        const provider = new ethers.providers.JsonRpcProvider(
          process.env.REACT_APP_INFURA_KEY
        );

        // Resolve the address to an ENS domain
        const resolvedDomain = await provider.lookupAddress(id);
        console.log("resolvedDomain: ", resolvedDomain);
        setEnsDomain(resolvedDomain);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      resolveAddress();
    }
  }, [id]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <p className={"m-0 p-0 " + (!ensDomain ? "" : "ens-color")}>
          {!ensDomain ? id : ensDomain}
        </p>
      )}
    </div>
  );
}
