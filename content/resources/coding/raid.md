---
{"publish":true,"title":"RAID","created":"2025-01-11 16:37","tags":["#manual","#resource"],"cssclasses":""}
---


# RAID

> [!abstract]
> RAID (Redundant Array of Inexpensive Disks), allows to turn multiple physical hard drives into a single logical hard drive.

## Hardware RAID vs. Software RAID

RAID can be either setup using a hard drive PCIe controller or use software to create it.

### Software RAID Setup Steps

#### 1. Format Hard drives

- Find device names using `sudo fdisk -l`
- Create partition table using `sudo parted /dev/sda mklabel gpt`
- Create partition by using `sudo fdisk /dev/sda
  - Type `n` to create a new partition
  - Type `1` to create `/dev/sda1`
  - Press Enter to choose default first sector
  - Press Enter to choose default last sector (Using the whole drive)
  - Change partition type by typing `t`
  - Enter `fd` to set partition type to `Linux raid autodetect`
  - Type `p` to check the partition type
  - Type `w` to apply all changes

### Create RAID x Logical Drive

- Using `mdadm` use the following command for a RAID 1 drive.

```bash
sudo mdadm --create /dev/md0 --level=mirror --raid-devices=2 /dev/sda1 /dev/sdb1
```

- Check progress by using `cat /proc/mdstat`

### Create File System on the RAID x Logical Drive

- Format the drive using `sudo mkfs.ext4 /dev/md0`
- Mount the drive using `sudo mkdir -p /mnt/raid1 && sudo mount /dev/md0 /mnt/raid1`
