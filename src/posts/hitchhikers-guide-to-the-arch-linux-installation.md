---
title: "Hitchhiker's Guide to the Arch Linux Installation"
description: "This guide is the perfect companion for your first Arch Linux installation. It breaks down the process step by step, simplifying the technical details, and ensuring you don’t feel lost. From partitioning the disk to setting up a swap file, I’ll guide you through it all—including a few pro tips to save you from the mistakes I made as a beginner."
date: "2024-9-24"
image: /hitchhikers-guide-to-the-arch-linux-installation-banner.png
categories:
  - linux
  - arch
  - tutorial
published: true
---

If you're here, you're probably about to embark on your first-ever Arch Linux installation, and let me tell you, that can seem pretty intimidating at first glance. But don’t worry—you’re not alone! We’re going to take this one step at a time, and I’ll guide you through every part of the process as you venture into the wonderful world of Arch Linux.

**Pro tip**: If this is your **first time** installing Arch, I recommend giving it a try on a **virtual machine** first. That way, you can get a feel for the steps without worrying about messing up your main system. Once you're comfortable, you can tackle the real deal with confidence!

---

### **1. Prepare the Installation Medium**

- Download the latest **Arch Linux ISO** from the [official site](https://archlinux.org/download/).
- Create a bootable USB using a tool like `dd`, Rufus, or Etcher.

### **2. Boot the System from the USB**

- Insert the USB, reboot your computer, and select the USB device from your BIOS/UEFI boot menu.
- When the boot loader appears, select **Arch Linux install medium** and press `Enter`.

### **3. Set the Console Keyboard Layout**

Since we're in the USA, set the keyboard layout to American English:

```bash
loadkeys us
```

### **4. Verify the Boot Mode (UEFI vs BIOS)**

- Run this command to confirm you're in UEFI mode (64-bit):

  ```bash
  ls /sys/firmware/efi
  ```

- If the directory exists, you're in UEFI mode. Otherwise, you’re in BIOS mode.

### **5. Connect to the Internet**

- To verify network devices:

  ```bash
  ip link
  ```

- For **Ethernet**: You should be automatically connected if the cable is plugged in.
- For **Wi-Fi**:

  ```bash
  iwctl
  ```

  - Use `device list`, `station DEVICE scan`, `station DEVICE get-networks`, and `station DEVICE connect SSID` to connect.

- Verify the connection:

  ```bash
  ping archlinux.org
  ```

### **6. Update the System Clock**

- Run this command to synchronize your system clock:

  ```bash
  timedatectl set-ntp true
  ```

### **7. Partition the Disk**

Partitioning can be confusing, especially if it’s your first time. Here’s a quick breakdown: a **partition** is just a section of your hard drive dedicated to specific tasks—like storing files or acting as the bootloader. In Linux, we often divide the disk into several partitions, and for Arch Linux, the main ones we’ll need are for the **root system** and the **EFI boot**.

**Important:** Be **absolutely sure** you're working on the correct drive. Double and triple-check, or you risk losing all of your data. Trust me, I’ve accidentally wiped my data more times than I care to admit by not being careful enough with this step!

When you enter `fdisk`, things might seem a bit cryptic, so let’s make it easy. To create a new partition, use the following steps:

- Identify your disk:

  ```bash
  fdisk -l
  ```

- Partition your disk using **fdisk** (assuming `/dev/sda`):

  ```bash
  fdisk /dev/sda
  ```

- Create the following partitions:

  1. **EFI System Partition** (FAT32, ~512MB) for UEFI systems.
  2. **Root Partition** (ext4, at least 30GB).

- Type **`n`** to create a new partition.
- Select the partition number (usually **1** for the first partition).
- For the **partition type**, choose **23** (Linux root x86-64).
- After selecting the partition size (I recommend at least 30GB for the root partition), you’ll move on to the next one.

### **8. Format the Partitions**

- Format the **root** partition as ext4:

  ```bash
  mkfs.ext4 /dev/sdaX
  ```

- Format the **EFI** partition (for UEFI systems):

  ```bash
  mkfs.fat -F32 /dev/sdaY
  ```

### **9. Create a Swap File (Instead of Swap Partition)**

While some users still opt for a swap partition, a **swap file** is more flexible and easier to resize later. Swap is useful when your system runs out of RAM or when you want to hibernate your computer.

- **How to size the swap file**:
  - **If you don’t hibernate**: A swap file about half the size of your RAM is usually enough.
  - **If you hibernate**: The swap file should be equal to or slightly larger than your RAM.

**Why hibernation matters**: Laptops benefit from hibernation since you can save your session and resume later without losing your work. On desktops, it’s less critical, especially if you shut down your system regularly (like I do—it keeps my setup clutter-free!).

To create a 4GB swap file (adjust as needed for your setup):

```bash
fallocate -l 4G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
```

- Add the swap file to `fstab` for persistence:

  ```bash
  echo '/swapfile none swap defaults 0 0' | tee -a /etc/fstab
  ```

### **10. Mount the File Systems**

- Mount the root partition:

  ```bash
  mount /dev/sdaX /mnt
  ```

- Mount the EFI partition (for UEFI):

  ```bash
  mkdir /mnt/boot
  mount /dev/sdaY /mnt/boot
  ```

### **11. Install the Base System**

- Install the base packages:

  ```bash
  pacstrap /mnt base linux linux-firmware
  ```

### **12. Generate the fstab File**

- Generate the file system table:

  ```bash
  genfstab -U /mnt >> /mnt/etc/fstab
  ```

### **13. Chroot into the New System**

- Change root into the new system:

  ```bash
  arch-chroot /mnt
  ```

### **14. Set the Time Zone**

- Set your time zone to CST (Central Standard Time):

  ```bash
  ln -sf /usr/share/zoneinfo/America/Chicago /etc/localtime
  hwclock --systohc
  ```

### **15. Localization**

- Edit `/etc/locale.gen` to uncomment `en_US.UTF-8 UTF-8`.
- Generate the locales:

  ```bash
  locale-gen
  ```

- Set the **locale**:

  ```bash
  echo "LANG=en_US.UTF-8" > /etc/locale.conf
  ```

### **16. Configure the Network**

- Set the hostname (we'll keep it lighthearted with **archbtw**):

  ```bash
  echo "archbtw" > /etc/hostname
  ```

- Edit `/etc/hosts`:

  ```bash
  127.0.0.1 localhost
  ::1       localhost
  127.0.1.1 archbtw.localdomain archbtw
  ```

### **17. Install NetworkManager, base-devel, and git**

**Pro tip**: I always forget to install NetworkManager, and it causes major headaches when I can’t connect to the internet. Save yourself the trouble!

```bash
pacman -S networkmanager base-devel git
systemctl enable NetworkManager
```

### **18. Create a New User Before Rebooting**

Before rebooting, let’s create a user account:

```bash
useradd -m -G wheel -s /bin/bash yourusername
passwd yourusername
```

- Enable the user to use sudo by editing the sudoers file:

```bash
EDITOR=vi visudo
```

Uncomment this line:

```bash
%wheel ALL=(ALL) ALL
```

### **19. Install and Configure the Bootloader**

For **UEFI** systems, install and configure GRUB:

- Install GRUB and EFI boot manager:

  ```bash
  pacman -S grub efibootmgr
  ```

- Install GRUB to the EFI directory:

  ```bash
  grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
  ```

- Generate the GRUB configuration file:

  ```bash
  grub-mkconfig -o /boot/grub/grub.cfg
  ```

### **20. Set Root Password**

- Set the root password:

  ```bash
  passwd
  ```

### **21. Reboot into the New System**

- Exit the chroot environment:

  ```bash
  exit
  ```

- Unmount partitions:

  ```bash
  umount -R /mnt
  ```

- Reboot:

  ```bash
  reboot
  ```

---

### **Join the Community!**

If you made it this far, congrats! Installing Arch Linux isn’t easy, but you did it. 🎉 If you’re into Linux, programming, or just want to chat with like-minded people, join me and other positive people in our **Discord** community! We’re always happy to talk shop, share tips, and help each other grow. [Click here to join!](https://discord.gg/4PCy4Bz)
