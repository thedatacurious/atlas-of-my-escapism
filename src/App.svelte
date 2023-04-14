<script>
  import Scroller from "@sveltejs/svelte-scroller";
  import Map from "./lib/Map.svelte";
  let index, indexPrev, src, alt, offset, progress;

  const mapActions = [
    ["/mapLegend.jpg", "Legend showing terrain mapping to emotion"],
    [
      "/plantLegend.jpg",
      "Legend showing how the plant height refers to time spent watching and the number of leaves refers to count of videos",
    ],
    [
      "/strokeLegend.jpg",
      "Legend on the video format. A stroke refers to competition streaming; a filled block refers to a documentary or video essay; a circle refers to a fictional clip",
    ],
    [
      "/colourLegend.jpg",
      "Legend on the video content. Green refers to nature; blue refers to climbing; yellow refers to current affairs; pink refers to comedy",
    ],
  ];

  // Reactive code to trigger MAP actions
  $: if (index != indexPrev) {
    if (mapActions[+index]) {
      src = mapActions[index][0];
      alt = mapActions[index][1];
    }
    indexPrev = index;
  }
</script>

<main>
  <div>
    <h1>Atlas of my Escapism</h1>
    <p>For 60 days, I tracked my Youtube habits.</p>
    <p>
      Depending on the day, I may be in a different headspace when watching
      Youtube.
    </p>
  </div>

  <Scroller top={0.2} bottom={0.8} bind:index bind:offset bind:progress>
    <div slot="background">
      <img {src} {alt} />
    </div>

    <div slot="foreground">
      <section />
      <section>
        <p>Each lump with prints represents a day of watching.</p>
        <p>There were four days where I didn't watch any Youtube.</p>
      </section>
      <section>
        <p>I'm a climber...</p>
        <p>so it's probably not that surprising</p>
        <p>that spikes in my watch time were due to climbing competitions.</p>
        <p>The max time was almost 5 hours</p>
      </section>
      <section>
        <p>
          I'm also a fan of nature and comedy videos—and the occasional ones on
          current affairs
        </p>
        <p>Time to explore the map on your own!</p>
      </section>
    </div>
  </Scroller>

  <div class="full-screen-width"><Map /></div>
</main>

<style>
  img {
    width: 100%;
    height: auto;
    margin: 0.5em 0 1em 0;
  }

  section {
    height: 80vh;
  }

  .full-screen-width {
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    max-width: 100vw;
    width: 100vw;
  }
</style>
