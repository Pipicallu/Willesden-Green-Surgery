import { describe, it, expect } from "vitest";
import { dynamicNavLinkSorter } from "./dynamicNavLinkSorter";

const mockLinks = {
  links: {
    "7c622c27-5998-45a1-b66c-5332b79d212d": {
      id: 169818196715715,
      uuid: "7c622c27-5998-45a1-b66c-5332b79d212d",
      slug: "patient-corner/patient-information",
      path: null,
      parent_id: 160949182525303,
      name: "patient-information",
      is_folder: false,
      published: true,
      is_startpage: false,
      position: -20,
      real_path: "/patient-corner/patient-information",
    },
    "2987ebe2-3d64-4c54-a6ec-518a122a6aa0": {
      id: 160949182525303,
      uuid: "2987ebe2-3d64-4c54-a6ec-518a122a6aa0",
      slug: "patient-corner",
      path: null,
      parent_id: null,
      name: "patient-corner",
      is_folder: true,
      published: false,
      is_startpage: false,
      position: -10,
      real_path: "/patient-corner",
    },
    "294d2904-18ea-4331-bbd0-884f3a8b9a5f": {
      id: 168048162358405,
      uuid: "294d2904-18ea-4331-bbd0-884f3a8b9a5f",
      slug: "patient-corner/your-pregnancy",
      path: null,
      parent_id: 160949182525303,
      name: "your-pregnancy",
      is_folder: false,
      published: true,
      is_startpage: false,
      position: -10,
      real_path: "/patient-corner/your-pregnancy",
    },
    "28d3951a-936d-4132-8076-53de02c0f93b": {
      id: 128721096778274,
      uuid: "28d3951a-936d-4132-8076-53de02c0f93b",
      slug: "home",
      path: null,
      parent_id: 0,
      name: "Home",
      is_folder: false,
      published: true,
      is_startpage: false,
      position: 0,
      real_path: "/home",
    },
    "f28e0c35-675c-4e2e-99e0-3ef848f34bea": {
      id: 132860710291985,
      uuid: "f28e0c35-675c-4e2e-99e0-3ef848f34bea",
      slug: "new-patients",
      path: null,
      parent_id: null,
      name: "New-patients",
      is_folder: false,
      published: true,
      is_startpage: false,
      position: 0,
      real_path: "/new-patients",
    },
    "12dafb4c-d9f4-463e-acf6-ac630c1f7e32": {
      id: 160954749887264,
      uuid: "12dafb4c-d9f4-463e-acf6-ac630c1f7e32",
      slug: "patient-corner/safe-surgeries",
      path: null,
      parent_id: 160949182525303,
      name: "safe-surgeries",
      is_folder: false,
      published: true,
      is_startpage: false,
      position: 0,
      real_path: "/patient-corner/safe-surgeries",
    },
  },
};

describe("dynamicNavLinkSorter", () => {
  it("nests child links under their parent", () => {
    const result = dynamicNavLinkSorter(mockLinks.links);
    console.log(result);
    const patientCorner = result.find((l) => l?.name === "Patient Corner");
    expect(patientCorner?.childLinks).toHaveLength(3);
  });

  it("leaves root-level links with null childLinks when they have no children", () => {
    const result = dynamicNavLinkSorter(mockLinks.links);
    const newPatients = result.find((l) => l?.name === "New Patients");
    expect(newPatients?.childLinks).toBeNull();
  });

  it("omits the home entry from the result", () => {
    const result = dynamicNavLinkSorter(mockLinks.links);
    expect(result.find((l) => l.name === "Home")).toBeUndefined();
  });

  it("formats the slug as the name for each link", () => {
    const result = dynamicNavLinkSorter(mockLinks.links);
    const patientCorner = result.find((l) => l?.name === "Patient Corner");
    expect(patientCorner?.name).toBe("Patient Corner");
  });

  it("formats the children slugs as names for each child link", () => {
    const result = dynamicNavLinkSorter(mockLinks.links);
    const patientCorner = result.find((l) => l?.name === "Patient Corner");
    const childLinkNames = patientCorner?.childLinks?.map(
      (child) => child.name,
    );
    expect(childLinkNames).toEqual([
      "Patient Information",
      "Your Pregnancy",
      "Safe Surgeries",
    ]);
  });
});
