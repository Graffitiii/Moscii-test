<script setup>
import { ref, onMounted } from "vue";

// defineProps({
//   msg: String,
// })
const addName = ref();
const addType = ref();
const editName = ref();
const editType = ref();
const editId = ref();
const deleteId = ref();
const dialog = ref(false);
const deleteDialog = ref(false);
const addDialog = ref(false);
const headers = ref([
  { title: "Id", align: "start", key: "_id" },
  { title: "Device Name", align: "start", key: "name" },
  { title: "Type", align: "start", key: "type" },
  { title: "Manage", align: "center", key: "manage" },
]);
const deviceList = ref();

const editHandle = (item) => {
  editName.value = item.name;
  editType.value = item.type;
  editId.value = item._id;
  dialog.value = true;
};

const deletetHandle = (item) => {
  deleteId.value = item._id;
  deleteDialog.value = true;
};

const getDeviceList = async () => {
  try {
    // loading.value = true;
    const res = await fetch("http://localhost:3000/getDevice");
    const result = await res.json();

    if (res.ok) {
      deviceList.value = result.list;
      // loading.value = false;
    }
  } catch (err) {
    // error.value = err.message;
  }
};

const addDevice = async () => {
  if(addName.value != null || addName.value != undefined || addType.value != null || addType.value != undefined){
    try {
      // loading.value = true;
      const res = await fetch("http://localhost:3000/createDevice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: addName.value, type: addType.value }),
      });
      const result = await res.json();
      if (res.ok) {
        addDialog.value = false;
        addName.value = null
        addType.value = null
        getDeviceList();
        
      }

      // response.value = result;
    } catch (err) {
      // error.value = err.message;
    }
  }
  
}

const deleteDevice = async () => {
  try {
      // loading.value = true;
      const res = await fetch("http://localhost:3000/deleteDevice", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: deleteId.value }),
      });
      const result = await res.json();
      if (res.ok) {
        deleteDialog.value = false;
        getDeviceList();
        
      }

      // response.value = result;
    } catch (err) {
      // error.value = err.message;
    }
}

const editDevice = async () => {
  if(editName.value != "" || editType.value != ""){
    try {
      // loading.value = true;
      const res = await fetch("http://localhost:3000/editDevice", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: editId.value, name: editName.value, type: editType.value }),
      });
      const result = await res.json();
      if (res.ok) {
        dialog.value = false;
        getDeviceList();
        
      }

      // response.value = result;
    } catch (err) {
      // error.value = err.message;
    }
  }
  
}

onMounted(() => {
  getDeviceList();
  console.log("sdsda");
});
</script>

<template>
  <div class="pd-page">
    <div>
      <h2 class="topic text-center mt-5">Device List</h2>
    </div>

    <v-data-table-virtual
      :headers="headers"
      :items="deviceList"
      :mobile="null"
      mobile-breakpoint="md"
      class="mt-5"
    >
      <template v-slot:item.manage="{ value, item }">
        <div class="d-flex justify-center">
          <v-btn
            variant="text"
            class="mdi mdi-pencil-outline"
            @click="editHandle(item)"
          ></v-btn>
          <v-btn
            variant="text"
            class="mdi mdi-trash-can-outline"
            @click="deletetHandle(item)"
          ></v-btn>
        </div>
      </template>
    </v-data-table-virtual>

    <v-btn class="w-100 mt-5" @click="addDialog = true">Add Device</v-btn>

    <v-dialog v-model="dialog" width="auto">
      <v-card
        max-width="400"
        prepend-icon="mdi-pencil-outline"
        :title="`Edit device id : ${editId}`"
      >
        <div class="pa-5">
          <v-text-field
            density="compact"
            label="Device name"
            variant="outlined"
            v-model="editName"
          ></v-text-field>
          <v-text-field
            density="compact"
            label="Device type"
            variant="outlined"
            v-model="editType"
          ></v-text-field>
        </div>

        <template v-slot:actions>
          <v-btn class="" text="Cancel" @click="dialog = false"></v-btn>
          <v-btn class="" text="Submit" @click="editDevice()"></v-btn>
        </template>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" width="auto">
      <v-card
        max-width="400"
        prepend-icon="mdi-plus"
        title="Delete device"
        :text="`Do you want to delete device id : ${deleteId}?`"
      >
        <template v-slot:actions>
          <v-btn class="" text="No" @click="deleteDialog = false"></v-btn>
          <v-btn class="" text="Yes" @click="deleteDevice()"></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>

  <v-dialog v-model="addDialog" width="400">
    <v-card max-width="400" prepend-icon="mdi-plus" title="Add device">
      <div class="pa-5">
        <v-text-field
        density="compact"
        label="Device name"
        variant="outlined"
        v-model="addName"
      ></v-text-field>
      <v-text-field
        density="compact"
        label="Device type"
        variant="outlined"
        v-model="addType"
      ></v-text-field>
      </div>
      
      <template v-slot:actions>
        <v-btn class="" text="cancel" @click="addDialog = false"></v-btn>
        <v-btn class="" text="submit" @click="addDevice()"></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.pd-page {
  padding-left: 15%;
  padding-right: 15%;
}
.topic {
  color: black;
}
.mdi {
  font-size: 30px;
}
</style>
