import React from 'react'
import * as d3 from 'd3'
import { useEffect, useRef } from 'react'
import { Box, Button, Flex } from '@chakra-ui/react'

const color = d3.scaleOrdinal(d3.schemeTableau10)

const width = 400
const height = 400

const chart = (() => {
  const svg = (
    d3.create('svg')
    .attr('viewBox', [-width / 2, -height / 2, width, height])
    .attr('width', '100%')
    .attr('height', '100%')
  )
  const simulation = (
    d3.forceSimulation()
    .force('charge', d3.forceManyBody().strength(-1000))
    .force('link', d3.forceLink().id(d => d.id).distance(200))
    .force('x', d3.forceX())
    .force('y', d3.forceY())
    .on('tick', ticked)
  )
  let link = (
    svg.append('g')
    .attr('stroke', '#000')
    .attr('stroke-width', 1.5)
    .selectAll('line')
  )
  let node = (
    svg.append('g')
    .attr('stroke', '#fff')
    .attr('stroke-width', 1.5)
    .selectAll('circle')
  )

  function ticked() {
    node
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)

    link
    .attr('x1', d => d.source.x)
    .attr('y1', d => d.source.y)
    .attr('x2', d => d.target.x)
    .attr('y2', d => d.target.y)
  }

  return Object.assign(svg.node(), {
    update: ({ nodes, links }) => {
      // Make a shallow copy to protect against mutation, while
      // recycling old nodes to preserve position and velocity.
      const old = new Map(node.data().map(d => [d.id, d]))
      nodes = nodes.map(d => Object.assign(old.get(d.id) || {}, d))
      links = links.map(d => Object.assign({}, d))

      node = (
        node.data(nodes, d => d.id)
        .join((enter) => (
          enter.append('circle')
          .attr('r', 8)
          .attr('fill', d => color(d.id))
        ))
      )
      link = (
        link.data(links, d => [d.source, d.target])
        .join('line')
      )

      simulation.nodes(nodes)
      simulation.force('link').links(links)
      simulation.alpha(1).restart()
    }
  })
})()

const graphs = [
  {
    nodes: [
      {id: 'a'},
      {id: 'b'},
      {id: 'c'}
    ],
    links: []
  },
  {
    nodes: [
      {id: 'a'},
      {id: 'b'},
      {id: 'c'}
    ],
    links: [
      {source: 'a', target: 'b'},
      {source: 'b', target: 'c'},
      {source: 'c', target: 'a'}
    ]
  },
  {
    nodes: [
      {id: 'a'},
      {id: 'b'}
    ],
    links: [
      {source: 'a', target: 'b'}
    ]
  },
]

export default () => {
  const container = useRef()

  useEffect(() => {
    chart.update(graphs[0])
    container.current?.appendChild(chart)
  }, [])


  return (
    <Flex direction="column">
      <Flex>
        {graphs.map((g, i) => (
          <Button onClick={() => chart.update(g)}>
            Graph #{i + 1}
          </Button>
        ))}
      </Flex>
      <Box h="90vh" ref={container}/>
    </Flex>
  )
}