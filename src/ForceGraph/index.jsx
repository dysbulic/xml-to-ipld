import React from "react"
import { runForceGraph } from "./generator"
import styles from "./index.module.css"
import data from './data.json'

export default ({
  linksData = data.links,
  nodesData = data.nodes,
  nodeHoverTooltip = () => {},
}) => {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (containerRef.current) {
      const { destroy } = runForceGraph(
        containerRef.current, linksData,
        nodesData, nodeHoverTooltip,
      )
      return destroy
    }
  }, [linksData, nodeHoverTooltip, nodesData]);

  return <div ref={containerRef} className={styles.container} />;
}
