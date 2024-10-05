//Base on JQuery
/**
 * @typedef {Object} EmployeeAllData
 * @property {string} id
 * @property {string} [com_id]
 * @property {string} [location_id]
 * @property {string} [location_name_th]
 * @property {string} [location_name_en]
 * @property {string} [dept_id]
 * @property {string} [dept_name_th]
 * @property {string} [dept_name_en]
 * @property {string} [dept_type_id]
 * @property {string} [dept_type_name_th]
 * @property {string} [dept_type_name_en]
 * @property {string} [dept_div_id]
 * @property {string} [dept_div_name_th]
 * @property {string} [dept_div_name_en]
 * @property {string} [dept_sec_id]
 * @property {string} [dept_sec_name_th]
 * @property {string} [dept_sec_name_en]
 * @property {string} [dept_dep_id]
 * @property {string} [dept_dep_name_th]
 * @property {string} [dept_dep_name_en]
 * @property {string} [dept_uni_id]
 * @property {string} [dept_uni_name_th]
 * @property {string} [dept_uni_name_en]
 * @property {string} [div]
 * @property {string} [sec]
 * @property {string} [dep]
 * @property {string} [uni]
 * @property {string} [package]
 * @property {string} [type_employee]
 * @property {string} [forEdit]
 * @property {string} [cost_center]
 * @property {string} [pos_id]
 * @property {string} [pos_name_th]
 * @property {string} [pos_name_en]
 * @property {string} [shift_id]
 * @property {string} [title_name_th]
 * @property {string} [first_name_th]
 * @property {string} [last_name_th]
 * @property {string} [full_name_th]
 * @property {string} [title_name_en]
 * @property {string} [first_name_en]
 * @property {string} [last_name_en]
 * @property {string} [full_name_en]
 * @property {string} [office_number]
 * @property {string} [office_number_ex]
 * @property {Date} [start_date]
 * @property {string} [start_date_str]
 * @property {Date} [regular_date]
 * @property {string} [regular_date_str]
 * @property {Date} [end_date]
 * @property {string} [end_date_str]
 * @property {string} [email_in]
 * @property {string} [email_ex]
 * @property {string} [tel]
 * @property {string} [line_id]
 * @property {string} [line_link]
 * @property {number} [biz_card]
 * @property {string} [biz_dept]
 * @property {number} [login_window]
 * @property {string} [login_name]
 * @property {string} [created_by]
 * @property {string} [created_com]
 * @property {Date} [created_at]
 * @property {string} [updated_by]
 * @property {string} [updated_com]
 * @property {Date} [updated_at]
 * @property {number} [status]
 * @property {string} [img]
 * @property {string|null} [job_brand]
 * @property {string|null} [special_skill]
 * @property {number|null} [introduce_status]
 * @property {string|null} [job_brand_id]
 * @property {string|null} [job_brand_name]
 * @property {string|null} [job_brand_type]
 * @property {number|null} [job_brand_level]
 */


var unit = [
  "L0",
  "L1",
  "L2",
  "L3",
  "L4",
  "L5",
  "L6",
  "L7",
  "L8",
  "L9",
  "S0",
  "S1",
  "S2",
  "S3",
  "S4",
  "S5",
  "S6",
  "C1",
  "M1",
  "M2",
  "M3",
  "M4",
  "M5",
  "M6",
  "M7",
  "M8",
];
var dept = ["M9", "M10"];
var sec = ["M11", "M12"];
var div = ["M13", "M14"];
var md = ["M15", "M16"];

// find Department of Employee ID
// sample $(employeeProfileJson).getDeptOf('15886')
$.fn.getDeptOf = function (empId) {
  const profile = this;
  const foundProfile = profile.get().find((emp) => emp.id === empId);
  if (foundProfile) {
    return foundProfile.dep || null;
  }
  return null;
};

$.fn.getSectionOf = function (empId) {
  const profile = this;
  const foundProfile = profile.get().find((emp) => emp.id === empId);
  if (foundProfile) {
    return foundProfile.sec || null;
  }
  return null;
};

$.fn.getDivOf = function (empId) {
  const profile = this;
  const foundProfile = profile.get().find((emp) => emp.id === empId);
  if (foundProfile) {
    return foundProfile.div || null;
  }
  return null;
};

$.fn.getDeptWhoApproverOf = function (empId) {
  const profile = this;
  const foundProfile = profile.get().find((emp) => emp.id === empId);

  if (foundProfile) {
    var foundProfileNextLevel = profile
      .get()
      .filter(
        (emp) => emp.id !== empId && emp.dep === foundProfile.dep && !emp.uni
      );

    return {
      profiles: function () {
        return foundProfileNextLevel.length > 0 ? foundProfileNextLevel : [];
      },
      email_in: function () {
        const profiles = this.profiles();
        return profiles.length > 0 ? profiles.map((emp) => emp.email_in) : [];
      },
    };
  }

  return {
    profiles: function () {
      return [];
    },
    email_in: function () {
      return [];
    },
  };
};

$.fn.getSectWhoApproverOf = function (empId) {
  const profile = this;
  const foundProfile = profile.get().find((emp) => emp.id === empId);

  if (foundProfile) {
    var foundProfileNextLevel = profile
      .get()
      .filter(
        (emp) =>
          emp.id !== empId &&
          emp.div === foundProfile.div &&
          emp.sec === foundProfile.sec &&
          !emp.dep &&
          !emp.uni
      );

    return {
      profiles: function () {
        return foundProfileNextLevel.length > 0 ? foundProfileNextLevel : [];
      },
      email_in: function () {
        const profiles = this.profiles();
        return profiles.length > 0 ? profiles.map((emp) => emp.email_in) : [];
      },
    };
  }

  return {
    profiles: function () {
      return [];
    },
    email_in: function () {
      return [];
    },
  };
};

$.fn.getDivtWhoApproverOf = function (empId) {
  const profile = this;
  const foundProfile = profile.get().find((emp) => emp.id === empId);

  if (foundProfile) {
    var foundProfileNextLevel = profile
      .get()
      .filter(
        (emp) =>
          emp.id !== empId &&
          emp.div === foundProfile.div &&
          !emp.sec &&
          !emp.dep &&
          !emp.uni
      );

    return {
      profiles: function () {
        return foundProfileNextLevel.length > 0 ? foundProfileNextLevel : [];
      },
      email_in: function () {
        const profiles = this.profiles();
        return profiles.length > 0 ? profiles.map((emp) => emp.email_in) : [];
      },
    };
  }

  return {
    profiles: function () {
      return [];
    },
    email_in: function () {
      return [];
    },
  };
};

$.fn.getWhoApproverOf = function (empId) {
  const profile = this;
  const foundProfile = profile.get().find((emp) => emp.id === empId);

  if (foundProfile) {
    var foundProfileNextLevel = [];

    if (unit.includes(foundProfile.job_brand)) {
      foundProfileNextLevel = profile
        .get()
        .filter(
          (emp) =>
            emp.id !== empId &&
            emp.div === foundProfile.div &&
            emp.sec === foundProfile.sec &&
            emp.dep === foundProfile.dep &&
            !emp.uni &&
            dept.includes(emp.job_brand)
        );

      if (foundProfileNextLevel.length == 0) {
        foundProfileNextLevel = profile
          .get()
          .filter(
            (emp) =>
              emp.id !== empId &&
              emp.div === foundProfile.div &&
              emp.sec === foundProfile.sec &&
              !emp.dep &&
              !emp.uni &&
              sec.includes(emp.job_brand)
          );
      }

      if (foundProfileNextLevel.length == 0) {
        foundProfileNextLevel = profile
          .get()
          .filter(
            (emp) =>
              emp.id !== empId &&
              emp.div === foundProfile.div &&
              !emp.sec &&
              !emp.dep &&
              !emp.uni &&
              div.includes(emp.job_brand)
          );
      }

      if (foundProfileNextLevel.length == 0) {
        foundProfileNextLevel = profile
          .get()
          .filter((emp) => emp.id !== empId && md.includes(emp.job_brand));
      }
    }

    if (dept.includes(foundProfile.job_brand)) {
      foundProfileNextLevel = profile
        .get()
        .filter(
          (emp) =>
            emp.id !== empId &&
            emp.div === foundProfile.div &&
            emp.sec === foundProfile.sec &&
            !emp.dep &&
            !emp.uni &&
            sec.includes(emp.job_brand)
        );

      if (foundProfileNextLevel.length == 0) {
        foundProfileNextLevel = profile
          .get()
          .filter(
            (emp) =>
              emp.id !== empId &&
              emp.div === foundProfile.div &&
              !emp.sec &&
              !emp.dep &&
              !emp.uni &&
              div.includes(emp.job_brand)
          );
      }

      if (foundProfileNextLevel.length == 0) {
        foundProfileNextLevel = profile
          .get()
          .filter((emp) => emp.id !== empId && md.includes(emp.job_brand));
      }
    }

    if (sec.includes(foundProfile.job_brand)) {
      foundProfileNextLevel = profile
        .get()
        .filter(
          (emp) =>
            emp.id !== empId &&
            emp.div === foundProfile.div &&
            !emp.sec &&
            !emp.dep &&
            !emp.uni &&
            div.includes(emp.job_brand)
        );

      if (foundProfileNextLevel.length == 0) {
        foundProfileNextLevel = profile
          .get()
          .filter((emp) => emp.id !== empId && md.includes(emp.job_brand));
      }
    }

    if (div.includes(foundProfile.job_brand)) {
      foundProfileNextLevel = profile
        .get()
        .filter((emp) => emp.id !== empId && md.includes(emp.job_brand));
    }

    return {
      profiles: function () {
        return foundProfileNextLevel.length > 0 ? foundProfileNextLevel : [];
      },
      basic_profiles: function () {
        return foundProfileNextLevel.length > 0
          ? foundProfileNextLevel.map(function (profile) {
            return {
              id: profile.id,
              full_name_en: profile.full_name_en,
              email_in: profile.email_in,
              position_name: profile.pos_name_th || profile.pos_name_en,
              div: profile.div,
              sec: profile.sec,
              dep: profile.dep,
              uni: profile.uni,
              nickname: profile.nickname,
              job_brand: profile.job_brand
            };
          })
          : [];
      },
      email_in: function () {
        const profiles = this.profiles();
        return profiles.length > 0 ? profiles.map((emp) => emp.email_in) : [];
      },
    };
  }

  return {
    profiles: function () {
      return [];
    },
    basic_profiles: function () {
      return [];
    },
    email_in: function () {
      return [];
    },
  };
};
