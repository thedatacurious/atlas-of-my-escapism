<script>
  import { onMount, onDestroy } from "svelte";
  import OpenSeadragon from "openseadragon";

  let viewer;

  onMount(() => {
    viewer = OpenSeadragon({
      id: "mapContainer",
      prefixUrl:
        "https://github.com/thedatacurious/atlas-of-my-escapism/tree/main/src/data/atlas_files/",
      tileSources:
        "https://raw.githubusercontent.com/thedatacurious/atlas-of-my-escapism/main/src/data/atlas.dzi",
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
