<script>
    import {Button,Icon} from "smelte";

  export let student
  $: allStudent = student.message
    

    const setStatus = async (username, activate)=>{
      console.log(username,activate)
      let active = !activate

      try {

      const rawResponse = await fetch('https://smart-identificatio.herokuapp.com/admin/activate-deactivate-student', {
      method: 'PUT',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({username:username, active:active})
      });
      const content = await rawResponse.json();

      if(content.success == true){
        console.log(content)
        async function getStudent(){
          const res = await fetch(`https://smart-identificatio.herokuapp.com/admin/get-all-student`);
          return student = await res.json();
        }
	      student = await getStudent()
      }
      else {
      console.log('incorrect username or password')

      }
          
      } catch (error) {
          console.log(error)
      }

    }

</script>

<main>
    <table class="zigzag">
        <thead>
          <tr>
            <th class="header">S/N</th>
            <th class="header">ID Number</th>
            <th class="header">Name</th>
            <th class="header">Level</th>
            <th class="header">Department</th>
            <th class="header">View</th>
            <th class="header">Status</th>

          </tr>
        </thead>
        <tbody>
          
          {#each allStudent as std, ind }
          <tr>
            <td class:de-active={std.active == false}>{ind + 1}</td>
            <td class:de-active={std.active == false}>{std.username}</td>
            <td class="sn" class:de-active={std.active == false}>{std.firstName + ' ' + std.lastName}</td>
            <td class:de-active={std.active == false}>{std.level}</td>
            <td class="sn" class:de-active={std.active == false}>{std.department}</td>
            <td class:de-active={std.active == false}><Button color="primary" light flat >view student</Button></td>

            {#if std.active}
              <td><Button color="blue" dark flat on:click={() => setStatus(std.username, std.active)}>active</Button></td>
            {:else }
              <td class:de-active={std.active == false}><Button color="primary" light flat on:click={() => setStatus(std.username, std.active)}>Deactivated</Button></td>
            {/if}

          </tr>
          {/each}
          
        </tbody>
      </table>
</main>

<style>
main {
  background-color: white;
  padding: 3rem;
  margin-left: 2rem;
  margin-right: 2.3rem;
  border-radius: 10px;
}

table {  
  font-family:sans-serif;
  width: 100%;
}  
  th, td {
    padding: 1em 1em;
    text-align:left;
  }  
    :nth-child(2) {
      text-align:right;
    }
  td {
    background-color:rgb(224, 217, 217);    
  }
  th {
    background-color:#009;
    color:#fff;
  }

.zigzag {
  border-collapse:separate;
  border-spacing:.25em 1em;
}    
  tbody tr:nth-child(odd) {
    transform:rotate(0.5deg);
  }
  thead tr,
  tbody tr:nth-child(even) {
    transform:rotate(-0.5deg);
  }
  
  .sn {
    width: 80%;
  }
  .de-active {
    background-color: #eee;
    color: rgb(121, 110, 110);
  }
  
</style>