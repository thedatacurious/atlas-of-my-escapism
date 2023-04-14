<script>
  import { onMount, onDestroy } from "svelte";
  import OpenSeadragon from "openseadragon";

  let viewer;

  onMount(() => {
    viewer = OpenSeadragon({
      id: "mapContainer",
      prefixUrl: "../src/data/atlas_files/",
      tileSources: "../src/data/atlas.dzi",
      maxZoomLevel: 8,
    });
  });

  onDestroy(() => {
    viewer.remove();
  });
</script>

<div id="mapContainer" />

<style>
  #mapContainer {
    position: relative;
    width: 100%;
    height: 80vh;
  }
</style>
